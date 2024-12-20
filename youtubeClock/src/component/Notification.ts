import React, {Compoenent} from 'react';
import {Notifications} from 'react-native';

class AlarmNotification extends Component {
  constructor(props) {
    super(props);
    Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationReceivedForeground(
      (notification: Notification, completion) => {
        console.log(
          `Notification received in foreground: ${notification.title} : ${notification.body}`,
        );
        completion({alert: false, sound: false, badge: false});
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification: Notification, completion) => {
        console.log(`Notification opened: ${notification.payload}`);
        completion();
      },
    );
  }
}
