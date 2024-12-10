import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-big-calendar';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Menu, Provider} from 'react-native-paper';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
const {width, height} = Dimensions.get('window');

const isFoldable = height >= 550 && height <= 790;

const MEETING_COLORS = {
  DEFAULT: '#1E90FF', // Blue
  PAID: '#32CD32', // Green
  TEST_DAY: '#FF4500', // Red-Orange
};

export default function CalendarScreen({navigation, route}) {
  const [meetings, setMeetings] = useState([]);
  const [clientName, setClientName] = useState('');
  const [team, setTeam] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM'));
  const [events, setEvents] = useState([]);
  const [showMonthCalendar, setShowMonthCalendar] = useState(false);
  const [calendarMode, setCalendarMode] = useState('week');
  const [selectedDate, setSelectedDate] = useState(moment());
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const user = auth().currentUser;
    const unsubscribe = firestore()
      .collection('Users')
      .doc(user.uid)
      .collection('Meetings')
      .onSnapshot(querySnapshot => {
        const meetings = querySnapshot.docs.map(documentSnapshot => ({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        }));

        setMeetings(meetings);
        const newData = meetings
          ?.filter(item => item.date && item.time && item.finishTime)
          .flatMap(item => {
            let clientsText = '';
            if (Array.isArray(item.clients) && item.clients.length > 0) {
              const clientNames = item.clients.map(client => client.name);
              if (clientNames.length > 2) {
                clientsText = `${clientNames[0]}, ${clientNames[1]}...`;
              } else {
                clientsText = clientNames.join(', ');
              }
            }

            try {
              const startMoment = moment(
                `${item.date} ${item.time}`,
                'YYYY-MM-DD hh:mm A',
              );
              const endMoment = moment(
                `${item.date} ${item.finishTime}`,
                'YYYY-MM-DD hh:mm A',
              );

              if (startMoment.isValid() && endMoment.isValid()) {
                return [
                  {
                    title: clientsText,
                    start: startMoment.toDate(),
                    end: endMoment.toDate(),
                    key: item?.key,
                    clients: item.clients,
                    meetingTitle: item.title,
                    creator: item.creator,
                    description: item.description,
                    meetingType: item.meetingType || 'DEFAULT',
                  },
                ];
              }
            } catch (error) {
              console.warn('Error processing meeting:', error);
            }
            return [];
          });

        setEvents(newData);
      });

    return () => unsubscribe();
  }, [route.params?.refresh]);

  console.log('meetings', meetings);
  console.log('eventss', events);

  const convertTimeToISO = (dateString, time) => {
    const dateTime = moment(`${dateString} ${time}`, 'YYYY-MM-DD hh:mm A');
    return dateTime.toDate();
  };

  const event = [
    {
      title: 'Meeting',
      start: new Date('2024-06-10T01:00:00'),
      end: new Date('2024-06-10T03:15:00'),
    },
    {
      title: 'Coffee break',
      start: new Date('2024-06-10T06:00:00'),
      end: new Date('2024-06-10T06:30:00'),
    },
  ];

  const handleCellPress = value => {
    const parsedDate = moment(value);
    const date = parsedDate.format('YYYY-MM-DD');
    const startTime = parsedDate.format('hh:mm A');
    const endTime = parsedDate.add(1, 'hour').format('hh:mm A');

    console.log('date', date, 'time', startTime, 'endtime', endTime);
    navigation.navigate('CreateMeetings', {
      date: date,
      startTime: startTime,
      finishTime: endTime,
    });
  };

  const handleEventPress = event => {
    console.log('eventpress', event);
    const date = moment(event.start).format('YYYY-MM-DD');
    const startTime = moment(event.start).format('hh:mm A');
    const endTime = moment(event.end).format('hh:mm A');
    console.log('date', date, 'start', startTime, 'end', endTime);
    const meeting = {
      date: date,
      time: startTime,
      finishTime: endTime,
      clients: event.clients,
      key: event.key,
      title: event.meetingTitle,
      creator: event.creator,
      description: event.description,
    };
    navigation.navigate('MeetingDetails', {
      meeting,
    });
  };

  const handleSwipe = month => {
    console.log('props', moment(month).format(''));
    const newMonth = moment(month).format('MMMM');
    if (newMonth !== currentMonth) {
      setCurrentMonth(newMonth);
      console.log('Updated current month to:', newMonth);
    } else {
      console.log('Current month remains:', currentMonth);
    }
  };

  const handleMonthPress = () => {
    setCurrentMonth(moment().format('MMMM'));
    setShowMonthCalendar(!showMonthCalendar);
  };

  const handleMonthCalendarDateSelect = date => {
    setSelectedDate(date);
    setShowMonthCalendar(false);
  };

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleViewChange = view => {
    setCalendarMode(view);
    closeMenu();
  };

  const getEventCellStyle = event => {
    return {
      backgroundColor:
        MEETING_COLORS[event.meetingType] || MEETING_COLORS.DEFAULT,
      borderRadius: 5,
      padding: 4,
    };
  };

  return (
    <Provider>
      <View style={{flex: 1, paddingTop: 10, backgroundColor: 'white'}}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../assets/backbtn.png')}
              style={{width: 25, height: 25, marginRight: 10}}
            />
          </TouchableOpacity>
          <Text style={styles.header}>Calendar</Text>
          <TouchableOpacity
            style={styles.monthButton}
            onPress={handleMonthPress}>
            <Text style={styles.monthButtonText}>{currentMonth}</Text>
          </TouchableOpacity>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu} style={styles.viewButton}>
                <IconM name="calendar-month-outline" size={24} color="gray" />
              </TouchableOpacity>
            }>
            <Menu.Item onPress={() => handleViewChange('day')} title="1 Day" />
            <Menu.Item
              onPress={() => handleViewChange('3days')}
              title="3 Days"
            />
            <Menu.Item
              onPress={() => handleViewChange('week')}
              title="7 Days"
            />
            <Menu.Item
              onPress={() => handleViewChange('month')}
              title="Month"
            />
          </Menu>
        </View>
        {showMonthCalendar && (
          <View style={styles.monthCalendarContainer}>
            <Calendar
              events={[]}
              height={300}
              showAdjacentMonths={false}
              mode={'month'}
              bodyContainerStyle={styles.monthBodyContainerStyle}
              onPressCell={handleMonthCalendarDateSelect}
              onSwipeEnd={handleSwipe}
              headerContainerStyle={styles.monthHeaderContainerStyle}
              weekContainerStyle={styles.weekContainerStyle}
              dateCellStyle={styles.dateCellStyle}
            />
          </View>
        )}
        <View style={{flex: 1}}>
          <Calendar
            events={events}
            height={600}
            ampm={true}
            date={selectedDate}
            onPressEvent={handleEventPress}
            swipeEnabled={true}
            onPressCell={handleCellPress}
            calendarContainerStyle={styles.containerStyle}
            bodyContainerStyle={styles.bodyContainerStyle}
            mode={calendarMode}
            headerContainerStyle={styles.headerContainerStyle}
            showWeekNumber={true}
            onSwipeEnd={handleSwipe}
            weekNumberPrefix="Week"
            allDayEventCellStyle={styles.allDayEventCellStyle}
            eventCellStyle={getEventCellStyle}
          />
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  containerStyle: {},
  headerContainerStyle: {
    height: 70,
  },

  headerContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: isFoldable ? height * 0.027 : height * 0.021,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'black',
  },
  headerView: {
    marginTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerTitle: {
    color: 'black',
    fontSize: 24,
  },
  bodyContainerStyle: {
    // backgroundColor: 'white',
  },
  monthButton: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  monthButtonText: {
    fontSize: isFoldable ? height * 0.02 : height * 0.017,
    color: 'gray',
  },
  monthCalendarContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  monthBodyContainerStyle: {
    // backgroundColor: 'white',
    // borderRadius: 10,
    // padding: 5,
  },
  monthHeaderContainerStyle: {
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#d0d0d0',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  weekContainerStyle: {
    backgroundColor: '#e0e0e0',
  },
  menuButtonText: {
    fontSize: isFoldable ? height * 0.02 : height * 0.017,
    color: 'gray',
    marginLeft: 10,
  },
  viewButton: {
    padding: 8,
    marginLeft: 10,
  },
  eventCell: {
    padding: 4,
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});
