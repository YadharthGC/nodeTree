import React, { useState } from "react";

export const Details = () => {
  const [companyName, setCompanyName] = useState("");
  const [tech, setTech] = useState("");
  const [plimit, setPlimit] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = () => {
    try {
      console.log(companyName, role, plimit, tech);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="detailsComponent">
      <div>
        <div className="headingName">
          <h1>Companies Details</h1>
        </div>

        <div className="content">
          <div className="role">
            <div>CompanyName</div>
            <div>
              <input
                type="text"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="company">
            <div>Role</div>
            <div>
              <input
                type="text"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="technology">
            <div>Technology</div>
            <div>
              <input
                type="radio"
                id="techYes"
                name="tech"
                onClick={(e) => {
                  console.log(e.target.id);
                  e.target.id.includes("Yes") && setTech("yes");
                }}
              />
              <label for="techYes">Yes</label>
              <input
                type="radio"
                id="techNo"
                name="tech"
                onClick={(e) => {
                  console.log(e.target.id);
                  e.target.id.includes("No") && setTech("no");
                }}
              />
              <label for="techNo">No</label>
            </div>
          </div>
          <div className="privateLimited">
            <div>Private Limited</div>
            <div>
              <input
                type="radio"
                id="plimitYes"
                name="plimit"
                onClick={(e) => {
                  console.log(e.target.id);
                  e.target.id.includes("Yes") && setPlimit("yes");
                }}
              />
              <label for="plimitYes">Yes</label>
              <input
                type="radio"
                id="plimitNo"
                name="plimit"
                onClick={(e) => {
                  console.log(e.target.id);
                  e.target.id.includes("No") && setPlimit("no");
                }}
              />
              <label for="plimitNo">No</label>
            </div>
          </div>
          <div className="finalSubmit">
            <input
              type="submit"
              onClick={() => {
                handleSubmit();
              }}
            />
          </div>
        </div>

        <div className="displayDetails">
          {companyName} {role} {plimit === "yes" ? "private limited" : ""}{" "}
          {tech === "yes" ? "technology" : ""}
        </div>
      </div>
    </div>
  );
};
