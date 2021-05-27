import axios from 'axios'

export default function AddMember() {
    
    function onSubmit(e) {
        e.preventDefault()
        const name = e.target
    }
    
    return(
        <>
        <form onSubmit={(e) => onSubmit(e)}>
            {/* <label for='name'>
                Name
            </label>
            <input type='text' id='name' /> */}
            <label for='number'>
                Mobile number
            </label>
            <input type='tel'  id='number' />
            <button> Log in </button>
        </form>
        <article>
            <p>Become a member</p>
        </article>
        </>
    )
}
