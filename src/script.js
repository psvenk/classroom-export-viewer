/*
Copyright 2019 psvenk
This file is part of Classroom Export Viewer.

Classroom Export Viewer is free/libre and open-source software pursuant to
the terms of the MIT/Expat License; see file `COPYING` for more details.

SPDX-License-Identifier: MIT
*/

"use strict";

document.getElementById("import_upload").addEventListener("click", () => {
    let file = document.getElementById("import_filepicker").files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.addEventListener("load", () => {
	let obj = JSON.parse(reader.result);
	console.log(obj);

	var titleElem = document.createElement("h2");
	titleElem.textContent = obj.name;
	document.getElementById("view").appendChild(titleElem);
    });
});
