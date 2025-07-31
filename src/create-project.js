export function createProject(title, entries = []){
        projectManager.addProject(title)
        projectManager.addProjectEntries(entries)

        function getTitle(){
            return title
        }

        function getEntries(){
            return entries
        }

        function addEntry(newEntry){
            entries.push(newEntry)
        }

        function removeEntry(id){
            const indexToRemove = entries.findIndex(entry => entry.getId() === id);
            if (indexToRemove !== -1) {
                entries.splice(indexToRemove,1);
                console.log(indexToRemove)
             }
        }

        const project = {
            getTitle,
            getEntries,
            addEntry,
            removeEntry,
        }

        return project
    }

import { projectManager } from "./manage-projects"