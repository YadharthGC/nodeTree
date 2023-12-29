import { useState, useEffect, useRef } from "react";
import { handleKeyChild } from "./employeeDetails";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./App.css";

export const Chart = () => {
  const [employeArr, setEmployeAr] = useState(handleKeyChild());
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
    return (
      <ul>
        {treeData.map((ele) => (
          <li>
            <div className="liDiv">
              <div>
                <AccountCircleIcon id="userIcon" />
              </div>
              <div className="employeName">{ele.name}</div>
              <div className="employeRole">({ele.designation})</div>
            </div>
            {ele.children && ele.children.length
              ? treeRendering(ele.children)
              : ""}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="organizationalChart" ref={containerRef}>
      <div className="tree">
        <ul>
          {employeArr.map((ele) => (
            <li>
              <div className="liDiv">
                <div>
                  <AccountCircleIcon id="userIcon" />
                </div>
                <div className="employeName">{ele.name}</div>
                <div className="employeRole">({ele.designation})</div>
              </div>
              {ele.children && ele.children.length
                ? treeRendering(ele.children)
                : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
