import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';

export const setTriggerNotif = async (date: Date, channelId: string) => {
  await notifee.requestPermission();
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
