import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';

// const weekdayMapping = {
//   Mon: '1',
//   Tue: 'Tuesday',
//   Wed: 'Wednesday',
//   Thu: 'Thursday',
//   Fri: 'Friday',
//   Sat: 'Saturday',
//   Sun: 'Sunday',
// };

const weekdayMapping = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 7,
};

export const setTriggerNotif = async (
  date: Date,
  selectedWeekdays: string[],
  channelId?: string,
) => {
  await notifee.requestPermission();
  if (selectedWeekdays.length > 0) {
    const dates = selectedWeekdays.map(selectedWeekday => {
      const daysNumber = weekdayMapping[selectedWeekday] - date.getDay();
      if (daysNumber < 0) {
        daysNumber + 7;
      }
      date.setHours(date.getHours() + daysNumber * 24);
      return date;
    });

    for (let i = 0; i < dates.length, i++; ) {
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: dates[i].getTime(),
      };
      await notifee.createTriggerNotification(
        {
          title: 'Meeting with Jane',
          body: 'Today at 11:20am',
          android: {
            channelId: channelId,
          },
        },
        trigger,
      );
    }
  }
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
  };

  await notifee.createTriggerNotification(
    {
      title: 'Meeting with Jane',
      body: 'Today at 11:20am',
      android: {
        channelId: channelId,
      },
    },
    trigger,
  );
};
