export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&// acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export function setData(){
    let projects = projectManager.getProjectObjects()
    let projectNames = projects.map(project => project.getTitle())
    let projectEntries = projectManager.getProjectEntries()

    let projectDataList = []

    for(let i = 0; i < projects.length; i++){
        let entryDataList = []

        projectEntries[i].map(entry => {
            let entryData = [entry.title,
            entry.description,
            entry.dueDate,
            entry.id]

            entryDataList.push(entryData)
        })

        let projectData = [projectNames[i], entryDataList]
        projectDataList.push(projectData)
    }   

        

    let projectsString = JSON.stringify(projectDataList)
    localStorage.setItem('savedProjects', projectsString)

}

// export function getData() {
//     if (!storageAvailable("localStorage")) return null;

//     const dataString = localStorage.getItem('savedProjects');
//     if (!dataString) return;

//     const retrievedData = JSON.parse(dataString);

//     retrievedData.forEach(([projectTitle, entryDataList]) => {
//         const entryObjects = entryDataList.map(([title, description, dueDate, id]) =>
//             createEntry(title, description, dueDate, false, id)
//         );

//         const project = createProject(projectTitle, entryObjects);
//         projectManager.addProjectObject(project);
//     });
// }

import { projectManager } from "./manage-projects";
import { createProject } from "./create-project";
import { createEntry } from "./entries";