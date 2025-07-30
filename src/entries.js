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

    function changeIsCompleted(){
        isCompleted != isCompleted
    }

    function getId(){
        return id
    }


    return {
        getTitle,
        getDescription,
        getDueDate,
        getIsCompleted,
        getId,
        changeIsCompleted,

    }

}
    
