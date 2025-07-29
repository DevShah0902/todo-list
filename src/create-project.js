export function createProject(title, entries = []){
        projectManager.addProject(title)

        function getTitle(){
            return title
        }

        function getEntries(){
            return entries
        }

        function addEntry(newEntry){
            entries.push(newEntry)
        }

        return{
            getTitle,
            getEntries,
            addEntry,
        }
    }

import { manageProjects, projectManager } from "./manage-projects"