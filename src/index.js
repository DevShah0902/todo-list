
const defaultProject =projectObject("Work")


const Display = (function(){
    const projectsBar = document.querySelector('.projects')
    const entriesBar = document.querySelector('.entries')
    let currentProject = defaultProject;
    let inViewAll = true;
    const entryModal = document.querySelector("#entry-modal")
    const editModal = document.querySelector("#edit-modal")
    function renderProjects(){

        createViewAll()

        const allProjects = projectManager.getProjectObjects()
        
        for(let i=0; i < allProjects.length; i++){
            createProject(allProjects[i])
        }

        createAddProject()
    }

    function renderEntries(projectEntries){
        projectDisplay()
        for(let i=0; i < projectEntries.length; i++) {
            createEntry(projectEntries[i])
        }
        
    }

    function viewAllEntries(){
        const everyProject = projectManager.getProjectEntries()
            for (let i = 0; i < everyProject.length; i++) {
                renderEntries(everyProject[i])
                
            }
    }

    function clearEntries(){
        entriesBar.textContent = ""
    }

    function clearProjects(){
        projectsBar.textContent = ""
    }
    function createViewAll() {
        const viewAll = document.createElement("button")
        viewAll.id = "view-all"
        viewAll.textContent = "View All"
        projectsBar.appendChild(viewAll)

        viewAll.addEventListener('click', () => {
            inViewAll = true
            clearEntries()
            viewAllEntries()
        })
    }

    function createProject(project){

        const projectDisplay = document.createElement('button')
        projectDisplay.classList.add("project")
        projectDisplay.textContent = project.getTitle()
        projectsBar.appendChild(projectDisplay)
        
        projectDisplay.addEventListener('click', () => {
            inViewAll = false
            changeCurrentProject(project)
            clearEntries()
            renderEntries(project.getEntries())
            createAddEntry()
        })
    }


    function createEntry(entry){
        const entryBox = document.createElement('div')
        entryBox.classList.add("entry-box")
        entriesBar.appendChild(entryBox)

        const deleteButton = document.createElement('button')

        
        deleteButton.textContent = "➖"
        deleteButton.id = entry.getId()
        deleteButton.classList.add('delete-button')
        entryBox.appendChild(deleteButton)

        deleteButton.addEventListener('click', () => {
            const allProjects = projectManager.getProjectObjects();

            for (let i = 0; i < allProjects.length; i++) {
                const allEntries = allProjects[i].getEntries();

                for (let j = 0; j < allEntries.length; j++) {
                    if (deleteButton.id === allEntries[j].getId()) {
                        allProjects[i].removeEntry(allEntries[j].getId());
                        clearEntries();
                        renderEntries(currentProject.getEntries());
                        if(inViewAll == false){
                            createAddEntry()
                        }
                        return;
                        }
                    }
                }
        });


        const entryContent = document.createElement('div')
        entryContent.classList.add("entry-content")
        entryBox.appendChild(entryContent)

        const entryTitle = document.createElement('h3')
        entryTitle.textContent = entry.getTitle()
        entryContent.appendChild(entryTitle)

        const entryDescription = document.createElement('p')
        entryDescription.textContent = entry.getDescription()
        entryDescription.classList.add("entry-description")
        entryContent.appendChild(entryDescription)

        const entryDueDate = document.createElement('p')
        entryDueDate.textContent = entry.getDueDate()
        entryDueDate.classList.add("entry-due-date")
        entryBox.appendChild(entryDueDate)

        const editButton = document.createElement('button')
        editButton.textContent = "⋮"
        editButton.id = entry.getId()
        editButton.classList.add('edit-button')
        entryBox.appendChild(editButton)

        const editTitle = document.querySelector("#edit-title")
        const editDescription = document.querySelector("#edit-description")
        const editDueDate = document.querySelector("#edit-due-date")  
        const editForm = document.querySelector("#edit-form")

        editButton.addEventListener('click', () => {
            editModal.showModal()
            const allProjects = projectManager.getProjectObjects();

            for (let i = 0; i < allProjects.length; i++) {
                const allEntries = allProjects[i].getEntries();

                for (let j = 0; j < allEntries.length; j++) {
                    if (deleteButton.id === allEntries[j].getId()) {
                        editTitle.value = allEntries[j].getTitle()
                        editDescription.value = allEntries[j].getDescription()
                        editDueDate.value = allEntries[j].getDueDate()
                        }
                    }
                }
        })

        let currentEntry = entry

        editForm.addEventListener('submit', (event) => {
            event.preventDefault()
            const allProjects = projectManager.getProjectObjects();

            for (let i = 0; i < allProjects.length; i++) {
                const allEntries = allProjects[i].getEntries();

                for (let j = 0; j < allEntries.length; j++) {
                    if (editButton.id === allEntries[j].getId()) {
                            clearEntries()
                            console.log(allEntries[j])
                            console.log(editButton.id)
                            currentEntry.edit(editTitle.value, editDescription.value, editDueDate.value)
                            if(inViewAll === false){
                                inViewAll = false
                                changeCurrentProject(allProjects[i])
                                clearEntries()
                                renderEntries(allProjects[i].getEntries())
                                createAddEntry()
                            }
                            else{
                                viewAllEntries()
                            }
                            editModal.close()
                        return;
                        }
                    }
                }
        })
        
    }   

    function createAddEntry(){
        const addMore = document.createElement('button')
        addMore.textContent = "Add Entry"
        addMore.classList.add("add-entry")
        entriesBar.appendChild(addMore)


        
        addMore.addEventListener('click',() => {
    
            entryModal.showModal()
        })

        
    }   


    const entryForm = document.querySelector("#entry-form")
        const nameInput = document.querySelector("#entry-title")
        const descriptionInput = document.querySelector("#entry-description")
        const dueDateInput = document.querySelector("#entry-due-date")
        entryForm.addEventListener('submit', (event) => {
            event.preventDefault()

            const newEntry = entryObject(
                nameInput.value, 
                descriptionInput.value, 
                dueDateInput.value)
            entryModal.close()
            nameInput.value = ""
            descriptionInput.value = ""
            dueDateInput.value = ""
            currentProject = getCurrentProject()
            currentProject.addEntry(newEntry)
            clearEntries()
            renderEntries(currentProject.getEntries())
            createAddEntry()
        })

    const projectModal = document.querySelector("#project-modal")
    const projectInput = document.querySelector("#project-input")
    const projectForm = document.querySelector("#project-form")
    
    function createAddProject(){
        const addProject = document.createElement('button')
        addProject.id = "add-project"
        addProject.textContent = "Add Project"
        projectsBar.appendChild(addProject)

        addProject.addEventListener('click', () => {
            projectModal.showModal()
        })

        projectForm.addEventListener('submit', (event) => {
            event.preventDefault()
            projectModal.close()
            const newProject = projectObject(projectInput.value)
            projectManager.addProjectObject(newProject)
            createProject(newProject)
            projectInput.value = ""
            clearProjects()
            renderProjects()
        })
        
    }

    function changeCurrentProject(project){
        currentProject = project
        inViewAll = false
    }

    function getCurrentProject(){
        return currentProject
    }

    function projectDisplay(){
        const h2 = document.querySelector(".h2")
        if(inViewAll === false){
            h2.textContent = currentProject.getTitle()
        }
        else{
            h2.textContent = "All Entries"
        }
    }
    
    

    return{
        renderProjects,
        renderEntries,
        createAddEntry,
        getCurrentProject,
        viewAllEntries
        
    }

})()

const newProject = projectObject("New")
const entry1 = entryObject("finish project", "code", "2009-12-08")
newProject.addEntry(entry1)

projectManager.addProjectObject(defaultProject)
projectManager.addProjectObject(newProject)

Display.renderProjects()


Display.viewAllEntries()

import { createEntry as entryObject} from "./entries"
import { projectManager} from "./manage-projects"
import { createProject as projectObject} from "./create-project"
import "./styles.css";