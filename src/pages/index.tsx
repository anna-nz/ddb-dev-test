import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiMail } from "react-icons/fi";
import data from "data/notifications.json";

const Home: React.FC = () => {
  const { notifications } = data;
  const notificationRef = useRef<HTMLDivElement>(null);
  const notificationIconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notificationCount, setNotificationCount] = useState<number>(
    notifications.length
  );

  useEffect(() => {
    const notication = notificationRef.current;
    const noticationIcon = notificationIconRef.current;
    const timeline = gsap.timeline({ 
      defaults: { duration: 0.2, ease: "Power.out3" }
    })

    timeline
      .to(['.notification-panel', '.notification-title', notication, noticationIcon], {
        opacity: 1,
        stagger: 0.3,
      }, "<+0.2")
      .to(noticationIcon, { scale:1.3, ease: "power4.out" })
      .to(noticationIcon, { scale: 1 })

    return () => {
      gsap.killTweensOf(notication);
    };
  }, [notificationRef, notificationIconRef, contentRef]);

  console.log(notifications);

  return (
    <div
      className={"relative flex flex-col justify-start items-center h-screen max-w-4xl mx-auto"}
    >
      <div
        className={"w-full h-fit flex justify-center items-center px-20 py-10"}
      >
        <div
          ref={notificationRef}
          className={
            "notification-panel opacity-0 min-w-fit w-full bg-white rounded-full px-4 py-3 flex cursor-pointer justify-center items-center space-x-2 hover:shadow-md relative text-2xl"
          }
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={"inline-flex relative items-center"}>
            <p className="notification-title opacity-0">Notification</p>
            <div ref={notificationIconRef} className={"absolute -right-10 opacity-0"}>
              <FiMail />
              <span className={"absolute -top-1.5 text-xs -right-2"}>
                {notificationCount}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          "w-full h-fit flex content-end items-start justify-center py-2 px-20"
        }
      >
        <div className={"bg-white w-full h-full rounded-lg p-2 h-60"}>
          <p className={"text-center font-bold p-3"}>LIST OF MESSAGES</p>
          <ul>
            <li className={"hover:bg-slate-100 hover:text-sky-600 p-2 rounded-lg cursor-pointer"} >message 1</li>
            <li>message 2</li>
            <li>message 3</li>
            <li>etc</li>
          </ul>
        </div>
      </div>
      <div
        className={
          "w-full h-fit flex content-end items-start justify-center py-10 px-20"
        }
      >
        <div className={"bg-gray-200 w-full rounded-lg p-2 h-96 opacity-0"}>
          <h4 className={"text-center py-2"}>Title</h4>
          <div className={"h-[1px] w-full bg-black/[0.1]"} />
          <p className={"whitespace-pre-wrap text-center py-4"}>Text</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
