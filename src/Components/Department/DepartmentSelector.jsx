import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const departmentsData = [
  {
    department: "Customer Service",
    sub_departments: ["Support", "Customer Success"],
  },
  {
    department: "Design",
    sub_departments: ["Graphic Design", "Product Design", "Web Design"],
  },
];

const DepartmentSelector = () => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState([]);
  const [open, setOpen] = useState({});

  const handleDepartmentSelect = (department) => {
    const isDepartmentSelected = selectedDepartments.includes(
      department.department
    );

    if (isDepartmentSelected) {
      setSelectedDepartments(
        selectedDepartments.filter((dep) => dep !== department.department)
      );
      setSelectedSubDepartments(
        selectedSubDepartments.filter(
          (subDep) => !department.sub_departments.includes(subDep)
        )
      );
    } else {
      setSelectedDepartments([...selectedDepartments, department.department]);
      setSelectedSubDepartments([
        ...selectedSubDepartments,
        ...department.sub_departments,
      ]);
    }
  };

  const handleSubDepartmentSelect = (subDepartment, parentDepartment) => {
    setSelectedSubDepartments((prevSelected) =>
      prevSelected.includes(subDepartment)
        ? prevSelected.filter((subDep) => subDep !== subDepartment)
        : [...prevSelected, subDepartment]
    );

    const allSubDepartmentsSelected = parentDepartment.sub_departments.every(
      (subDep) => selectedSubDepartments.includes(subDep)
    );

    if (allSubDepartmentsSelected) {
      setSelectedDepartments([
        ...selectedDepartments,
        parentDepartment.department,
      ]);
    } else {
      setSelectedDepartments(
        selectedDepartments.filter((dep) => dep !== parentDepartment.department)
      );
    }
  };

  const handleToggle = (department) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [department.department]: !prevOpen[department.department],
    }));
  };

  return (
    <List>
      {departmentsData.map((departmentObj) => {
        const selectedSubsCount = departmentObj.sub_departments.filter(
          (subDep) => selectedSubDepartments.includes(subDep)
        ).length;

        return (
          <div key={departmentObj.department}>
            <ListItem>
              {open[departmentObj.department] ? (
                <ExpandLess
                  onClick={() => handleToggle(departmentObj)}
                  style={{ color: "grey", fontWeight: "500" }}
                />
              ) : (
                <ExpandMore
                  onClick={() => handleToggle(departmentObj)}
                  style={{ color: "grey", fontWeight: "500" }}
                />
              )}
              <ListItemIcon style={{ marginLeft: "20px" }}>
                <Checkbox
                  edge="start"
                  checked={
                    selectedDepartments.includes(departmentObj.department) ||
                    departmentObj.sub_departments.every((subDep) =>
                      selectedSubDepartments.includes(subDep)
                    )
                  }
                  onChange={() => handleDepartmentSelect(departmentObj)}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography={true}
                style={{
                  fontSize: "17px",
                  fontFamily: "Poppins",
                  color: "grey",
                  fontWeight: "500",
                }}
                primary={`${departmentObj.department} (${departmentObj.sub_departments.length})`}
              />
            </ListItem>
            <Collapse
              in={open[departmentObj.department]}
              timeout="auto"
              unmountOnExit
            >
              <List
                component="div"
                disablePadding
                style={{ marginLeft: "100px" }}
              >
                {departmentObj.sub_departments.map((subDepartment) => (
                  <ListItem
                    key={subDepartment}
                    dense
                    onClick={() =>
                      handleSubDepartmentSelect(subDepartment, departmentObj)
                    }
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={selectedSubDepartments.includes(subDepartment)}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={subDepartment}
                      disableTypography={true}
                      style={{
                        fontSize: "16px",
                        fontFamily: "Poppins",
                        color: "grey",
                        fontWeight: "500",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        );
      })}
    </List>
  );
};

export default DepartmentSelector;
