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

        const project = {
            getTitle,
            getEntries,
            addEntry,
        }

        return project
    }

import { manageProjects, projectManager } from "./manage-projects"