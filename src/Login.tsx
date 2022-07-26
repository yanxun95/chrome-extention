import { useEffect, useState } from "react";

const Login = () => {
  const [over5Sec, setOver5Sec] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");

  const logout = () => {
    localStorage.clear();
    btnNo();
  };

  const checkUser = () => {
    let user = localStorage.getItem("userName");
    user !== null && setUserName(user);
  };

  const btnYes = () => {
    window.open("https://help.nickelled.com");
  };

  const btnNo = () => {
    window.close();
  };

  const activityWatcher = () => {
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "Mouse",
    ];
    let lastActivity: number = 0;
    const maxInactivity: number = 5;

    const time = setInterval(() => {
      lastActivity++;
      console.log(lastActivity + " seconds since the user was last active");
      if (lastActivity >= maxInactivity) {
        console.log(
          "User has been inactive for more than " + maxInactivity + " seconds"
        );
        activityEvents.forEach(function (eventName) {
          document.removeEventListener(eventName, activity, true);
        });
        clearInterval(time);
        chrome.runtime.sendMessage("timeup");
      }
    }, 1000);

    const activity = () => {
      lastActivity = 0;
    };

    activityEvents.forEach(function (eventName) {
      document.addEventListener(eventName, activity, true);
    });
  };

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log(request);
    if (request === "timeup") {
      setOver5Sec(true);
    }
  });

  const getCurrentTab = async () => {
    console.log("getCurrenTab");
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    const id = tab.id as number;
    chrome.scripting.executeScript({
      target: { tabId: id, allFrames: true },
      func: activityWatcher,
    });
  };

  useEffect(() => {
    checkUser();
    getCurrentTab();
  }, []);

  return (
    <>
      {over5Sec === false ? (
        <div className="login-container">
          <span className="form-label-customize">Hi {userName}</span>
          <div className="btn-logout-container">
            <div className="btn-no" onClick={() => logout()}>
              Logout
            </div>
          </div>
        </div>
      ) : (
        <div className="login-container">
          <span className="form-label-customize">Are you lost {userName}?</span>
          <div className="btn-container">
            <div className="btn-yes" onClick={() => btnYes()}>
              <span>Yes</span>
            </div>
            <div className="btn-no" onClick={() => btnNo()}>
              <span>No</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
