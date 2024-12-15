import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';
import React from 'react';
import {Button} from 'react-native';


export const NotificationButton = () => {
  const triggerNotif = async () => {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    const date = new Date(Date.now());
    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    // Create a trigger notification
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

  return (
    <>
      <Button title="didi" onPress={triggerNotif} />
    </>
  );
};
