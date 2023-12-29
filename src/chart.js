import react, { useState, useEffect, useRef } from "react";
import {
  demoArr,
  demoFunction,
  temArr,
  newFun,
  need,
  up,
} from "./employeeDetails";
import "./App.css";
import { TreeView } from "@mui/x-tree-view";
import upimg from "./upicon.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Chart = () => {
  const [employeArr, setEmployeAr] = useState(up);
  const containerRef = useRef(null);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleMouseDown = (e) => {
      setIsGrabbing(true);
      setStartX(e.pageX);
      setStartY(e.pageY);
      setScrollLeft(containerRef.current.scrollLeft);
      setScrollTop(containerRef.current.scrollTop);
    };

    const handleMouseUp = () => {
      setIsGrabbing(false);
    };

    const handleMouseMove = (e) => {
      if (!isGrabbing) return;
      const x = e.pageX;
      const y = e.pageY;
      const walkX = (x - startX) * 2;
      const walkY = (y - startY) * 2;
      containerRef.current.scrollLeft = scrollLeft - walkX;
      containerRef.current.scrollTop = scrollTop - walkY;
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isGrabbing, startX, startY, scrollLeft, scrollTop]);

  const treeRendering = (treeData) => {
    // console.log(treeData);
    return (
      <>
        <ul>
          {treeData.map((item) => (
            <li className={item.name}>
              <div className="liDiv">
                <div className="headerBlank">
                  {/* <img src={upimg} /> */}
                  <AccountCircleIcon id="usericon" />
                </div>
                <div className="name">{item.name}</div>
                <div className="role">({item.designation})</div>
              </div>
              {item.children && item.children.length
                ? treeRendering(item.children)
                : ""}
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflowX: "hidden", // Hide the scrollbar
        whiteSpace: "nowrap",
        border: "1px solid #ccc",
        cursor: isGrabbing ? "grabbing" : "grab",
        //pointerEvents: "none",
      }}
    >
      <div className="tree">
        <ul
          style={
            {
              // width: "600px",
              // height: "400px",
              // background: "#f0f0f0",
              // marginTop: `${scrollPosition}px`,
            }
          }
        >
          {employeArr.map((item) => (
            <li className={item.name}>
              <div className="liDiv">
                <div className="headerBlank">
                  {/* <img src={upimg} /> */}
                  <AccountCircleIcon id="usericon" />
                </div>
                <div className="name">{item.name}</div>
                <div className="role">({item.designation})</div>
              </div>
              {item.children && item.children.length
                ? treeRendering(item.children)
                : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
