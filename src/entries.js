export function createEntry(title, description = "", dueDate = "", isCompleted = false, id = crypto.randomUUID()){

    function getTitle(){
        return title

    }

    function getDescription(){
        return description
    }

    function getDueDate(){
        return dueDate
    }

    function getIsCompleted(){
        return isCompleted
    }
    function getId(){
        return id
    }

    function changeTitle(newTitle){
        title = newTitle
    }

    function edit(newTitle, newDescription, newDate){
        title = newTitle
        description = newDescription
        newDate = newDate
    }

    return {
        getTitle,
        getDescription,
        getDueDate,
        getIsCompleted,
        getId,
        changeTitle,
        edit
    }

}
    
