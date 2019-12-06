/*
Copyright 2019 psvenk
This file is part of Classroom Export Viewer.

Classroom Export Viewer is free/libre and open-source software pursuant to
the terms of the MIT/Expat License; see file `COPYING` for more details.

SPDX-License-Identifier: MIT
*/

"use strict";

document.getElementById("import_upload").addEventListener("click", () => {
    const file = document.getElementById("import_filepicker").files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.addEventListener("load", () => {
        // Parse JSON file and store it in a JS object
        const obj = JSON.parse(reader.result);
        console.log(obj);

        // Populate the view
        createElems(getChildElems(obj), document.getElementById("view"));
    });
});

// Parses an object and returns information about elements to be added
// as children to the view element
const getChildElems = (obj) => {
    if (obj.version in parseElems) {
        return(parseElems[obj.version](obj));
    }
    else {
        console.log(
`Sorry, Classroom Export Viewer does not yet support version ${obj.version}
of Google Classroom exports.`
        );
    }
};

// A family of functions to parse HTML elements from an object,
// depending on the version
const parseElems = [];
parseElems[1] = (obj) => {
    const childElems = [];
    childElems.push({
        id: "className",
        type: "h2",
        content: obj.name || "Untitled Class",
    });
    if (obj.section) childElems.push({
        id: "section",
        type: "p",
        content: `Section: ${obj.section}`,
    });
    if (obj.room) childElems.push({
        id: "room",
        type: "p",
        content: `Room: ${obj.room}`,
    });
    if (obj.descriptionHeading) childElems.push({
        id: "origName",
        type: "p",
        content: `Original name: ${obj.descriptionHeading}`,
    });
    if (obj.description) {
        childElems.push(
            {
                id: "description-toggle",
                type: "input",
                attrs: {
                    "type": "button",
                    "value": "Show description",
                },
                onclick: (_this) => {
                    toggleElem("description")();
                    if (_this.value == "Show description")
                        _this.value = "Hide description";
                    else _this.value = "Show description";
                },
            },
            {
                id: "description",
                type: "p",
                parent: "description-container",
                content: `${obj.description}`,
                style: {
                    "display": "none",
                },
            },
        );
    }
    return childElems;
};

// Returns a function to toggle the element with the given ID
const toggleElem = (id) => () => {
    const elem = document.getElementById(id);
    if (elem.style.display == "none") elem.style.display = "block";
    else elem.style.display = "none";
};

// Create HTML elements according to data from getChildElems and add them to
// the area where class data will be displayed (the view)
const createElems = (childElems, view) => {
    // Clear the view
    view.innerHTML = "";

    // Object to store HTML elements within the view
    const elements = {};

    // Create elements according to data from getChildElems
    for (const elem of childElems) {
        if (elements[elem.id] || document.getElementById(elem.id)) {
            console.log(
`Internal error in function getChildElems: duplicate ID "${elem.id}" detected.
Please report this bug at:
https://github.com/psvenk/classroom-export-viewer/issues`
            );
            return;
        }

        // Create an element with the proper type and store it in an object
        const elemObj = document.createElement(elem.type);
        elements[elem.id] = elemObj;
        // Stored ID coincides with ID in DOM for convenience
        elemObj.id = elem.id;

        // Set the text content of the element
        elemObj.innerText = elem.content || "";

        // Set any initial style overrides
        for (const key in elem.style) {
            elemObj.style.setProperty(key, elem.style[key]);
        }

        // Set attributes
        for (const key in elem.attrs) {
            elemObj.setAttribute(key, elem.attrs[key]);
        }

        // Add onclick event listener, passing in elemObj as an argument
        if (elem.onclick) {
            elemObj.addEventListener("click", () => elem.onclick(elemObj));
        }

        // Add the element to its parent, which must be the view (default)
        // or a child thereof (in which case it would have an id in
        // the object `elements`)
        (elements[elem.parent] || view).appendChild(elements[elem.id]);
    }

    console.log(elements);
    return elements;
};
