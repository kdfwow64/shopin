  var OneSignal = window.OneSignal || [];
  console.log("onesignal app id => ", process.env.SHOPIN_ONE_SIGNAL_APP_ID || "2f6b1077-78c4-478e-b9d7-668005b26ed6");
  OneSignal.push(function() {
    OneSignal.init({
      appId: process.env.SHOPIN_ONE_SIGNAL_APP_ID || "2f6b1077-78c4-478e-b9d7-668005b26ed6",
    });
  });