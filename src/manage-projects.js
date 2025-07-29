const projectManager = function manageProjects() {
    const projects = []

    function getProjects(){
        return projects
    }

    function addProject(title){
        projects.push(title)
    }

    return {
        getProjects,
        addProject,
    }   
}()

export {projectManager}

