const defaultProject = createProject("Work")
const entry1 = entryObject("wash dishes", "for dad", "tmrw")
defaultProject.addEntry(entry1)
const entry2 = entryObject("wash dishes", "for dad", "tmrw")
defaultProject.addEntry(entry2)
const entry3 = entryObject("wash dishes", "for dad", "tmrw")
defaultProject.addEntry(entry3)
const entry4 = entryObject("wash dishes", "for dad", "tmrw")
defaultProject.addEntry(entry4)


const newProject = createProject("New")
const entryA = entryObject("wash dishes", "for dad", "tmrw")
newProject.addEntry(entryA)

const Display = (function(){
    const projectsBar = document.querySelector('.projects')
    const entriesBar = document.querySelector('.entries')
    let currentProject = defaultProject

    function renderProjects(){

        createViewAll()

        const allProjects = projectManager.getProjects()
        const allProjectEntries = projectManager.getProjectEntries()
        for(let i=0; i < allProjects.length; i++){
            createProject(allProjects[i], allProjectEntries[i])
        }

        createAddProject()
    }

    function renderEntries(projectEntries){

        for(let i=0; i < projectEntries.length; i++) {
            createEntry(projectEntries[i])
        }
        
    }

    function clearEntries(){
        entriesBar.textContent = ""
    }
    function createViewAll() {
        const viewAll = document.createElement("button")
        viewAll.id = "view-all"
        viewAll.textContent = "View All"
        projectsBar.appendChild(viewAll)

        viewAll.addEventListener('click', () => {
            clearEntries()

            const everyProject = projectManager.getProjectEntries()
            for (let i = 0; i < everyProject.length; i++) {
                console.log(everyProject[i])
                renderEntries(everyProject[i])
                
            }

        })
    }

    function createProject(project, projectEntries){
        const projectDisplay = document.createElement('button')
        projectDisplay.classList.add("project")
        projectDisplay.textContent = project
        console.log(project)
        projectsBar.appendChild(projectDisplay)
        
        projectDisplay.addEventListener('click', () => {
            changeCurrentProject(projectEntries)
            clearEntries()
            console.log([projectEntries])
            renderEntries(projectEntries)
            createAddEntry()
        })
    }

    function createEntry(entry){
        const entryBox = document.createElement('div')
        entryBox.classList.add("entry-box")
        entriesBar.appendChild(entryBox)

        const radioLabel = document.createElement('label')
        console.log(entry)
        radioLabel.id = entry.getId()

        const entryRadio = document.createElement('input')
        entryRadio.type = 'checkbox'
        entryRadio.id = entry.getId()
        entryBox.appendChild(radioLabel)
        radioLabel.appendChild(entryRadio)

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
    }   

    function createAddEntry(){
        const addMore = document.createElement('button')
        addMore.textContent = "Add Entry"
        entriesBar.appendChild(addMore)


        const entryModal = document.querySelector("#entry-modal")
        addMore.addEventListener('click',() => {
            const entryModal = document.querySelector("#entry-modal")
            entryModal.showModal()
        })

        const entryForm = document.querySelector("#entry-form")
        const nameInput = document.querySelector("#entry-title")
        const descriptionInput = document.querySelector("#entry-description")
        const dueDateInput = document.querySelector("#entry-due-date")
        entryForm.addEventListener('submit', (event) => {
            event.preventDefault()

            console.log(dueDateInput.value)
            const newEntry = entryObject(
                nameInput.value, 
                descriptionInput.value, 
                dueDateInput.value)

            console.log(newEntry)
            entryModal.close()
            
            clearEntries()
            getCurrentProject().push(newEntry)
            renderEntries(getCurrentProject())
            createAddEntry()
            
        })
    }   

    function createAddProject(){
        const addProject = document.createElement('button')
        addProject.id = "add-project"
        addProject.textContent = "Add Project"
        projectsBar.appendChild(addProject)
    }

    function changeCurrentProject(project){
        currentProject = project
    }

    function getCurrentProject(){
        return currentProject
    }
    

    return{
        renderProjects,
        renderEntries,
        createAddEntry
        
    }

})()

Display.renderEntries(defaultProject)
Display.renderProjects()


import { createEntry as entryObject} from "./entries"
import { projectManager} from "./manage-projects"
import { createProject } from "./create-project"
import "./styles.css";