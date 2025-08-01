import { createEntry as entryObject} from "./entries"
import { projectManager} from "./manage-projects"
import { createProject as projectObject} from "./create-project"
import "./styles.css";
import { getData, setData } from "./save"

const Display = (function(){
    const projectsBar = document.querySelector('.projects')
    const entriesBar = document.querySelector('.entries')
    let currentProject;
    let inViewAll = true;
    const entryModal = document.querySelector("#entry-modal")
    const editModal = document.querySelector("#edit-modal")
    const editTitle = document.querySelector("#edit-title")
    const editDescription = document.querySelector("#edit-description")
    const editDueDate = document.querySelector("#edit-due-date")  
    const editForm = document.querySelector("#edit-form")
    const deleteModal = document.querySelector("#delete-modal")
    const deleteConfirm = document.querySelector("#delete-confirm")
    const deleteClose = document.querySelector("#delete-close")
    let currentEntry;
    const addProject = document.createElement('button')
    let dataGot = false

    deleteClose.addEventListener('click', () => {
        deleteModal.close()
    })

    deleteConfirm.addEventListener('click', () =>{
        deleteModal.close()
        let entryToDelete = document.getElementById(currentEntry.id)
        if(entryToDelete && entryToDelete.parentNode){
            entryToDelete.parentNode.removeChild(entryToDelete)
            currentEntry.id = "deleted"
        }

        const allProjects = projectManager.getProjectObjects();

            for (let i = 0; i < allProjects.length; i++) {
                const allEntries = allProjects[i].getEntries();

                for (let j = 0; j < allEntries.length; j++) {
                    if (currentEntry.id === allEntries[j].getId()) {
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




    })

    function renderProjects(){

        createViewAll()

        const allProjects = projectManager.getProjectObjects()
        
        for(let i=0; i < allProjects.length; i++){
            createProject(allProjects[i])
        }

        createAddProject()
    }

    function renderEntries(project){
        projectDisplay()
        const projectEntries = project.getEntries()
        for(let i=0; i < projectEntries.length; i++) {
            createEntry(projectEntries[i])
        }
        
    }

    function viewAllEntries(){
        clearEntries()
        const everyProject = projectManager.getProjectObjects()
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
            renderEntries(currentProject)
            createAddEntry()
        })
    }


    function createEntry(entry){
        if(entry.id === "deleted"){

        }
        else{
        const entryBox = document.createElement('div')
        entryBox.id = entry.id
        entryBox.classList.add("entry-box")
        entriesBar.appendChild(entryBox)

        const deleteButton = document.createElement("button")
        
        deleteButton.textContent = "➖"
        deleteButton.id = entry.id
        deleteButton.classList.add('delete-button')
        entryBox.appendChild(deleteButton)

        deleteButton.addEventListener('click', () => {
            currentEntry = entry;
            deleteModal.showModal()
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

        editButton.addEventListener('click', () => {
            currentEntry = entry
            editModal.showModal()
            editTitle.value = entry.getTitle()
            editDescription.value = entry.getDescription()
            editDueDate.value = entry.getDueDate()
        })

        if(dataGot === true){
            setData()
        }
        }
        


    
        
    }   

    editForm.addEventListener('submit', (event) => {
            event.preventDefault()
            editModal.close()
            if(!currentEntry) return;

            currentEntry.edit(
                editTitle.value,
                editDescription.value,
                editDueDate.value
            )

            currentEntry = null;

            clearEntries()

            if (inViewAll === false) {
            renderEntries(currentProject);
            createAddEntry();
            } else {
            viewAllEntries();
  }
            setData()
        })

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
            renderEntries(currentProject)
            createAddEntry()
        })

    const projectModal = document.querySelector("#project-modal")
    const projectInput = document.querySelector("#project-input")
    const projectForm = document.querySelector("#project-form")
    
    projectForm.addEventListener('submit', (event) => {
            event.preventDefault()
            projectModal.close()
            const newProject = projectObject(projectInput.value)
            projectManager.addProjectObject(newProject)
            if(dataGot === true){
            setData()
            }
            createProject(newProject)
            projectInput.value = ""
            clearProjects()
            renderProjects()
        })

    function createAddProject(){
        addProject.id = "add-project"
        addProject.textContent = "Add Project"
        projectsBar.appendChild(addProject)

        addProject.addEventListener('click', () => {
            projectModal.showModal()
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
    
    function displayData(){
        const data = null
        if(!data){
            const defaultProject = projectObject("Main")
            projectManager.addProjectObject(defaultProject)
            currentProject = defaultProject;
            dataGot = true
            return
        }

        data.map(project => {
            const newProject = projectObject(project[0], project[1])
            projectManager.addProjectObject(newProject)

            project[1].forEach(entryArr => {
                const newEntry = entryObject(
                    entryArr[0], 
                    entryArr[1],  
                    entryArr[2],  
                    false,        
                );
                newEntry.changeId(entryArr[3])
                newProject.addEntry(newEntry);
                
            });
            createProject(newProject)
        
        })

        dataGot = true
    }

    return{
        renderProjects,
        renderEntries,
        createAddEntry,
        getCurrentProject,
        viewAllEntries,
        displayData,
        clearProjects
        
    }

})()

Display.displayData()
Display.clearProjects()
Display.renderProjects()
Display.viewAllEntries()

