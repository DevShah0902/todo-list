const projectManager = function manageProjects() {
    const projects = []
    const projectEntries = []

    function getProjects(){
        return projects
    }

    function getProjectEntries(){
        return projectEntries
    }

    function addProject(title){
        projects.push(title)
    }

    function addProjectEntries(entries){
        projectEntries.push(entries)
    }

    return {
        getProjects,
        addProject,
        addProjectEntries,
        getProjectEntries
    }   
}()

export {projectManager}

