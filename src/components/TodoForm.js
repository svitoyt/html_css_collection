import React, {useState, useEffect, useRef} from 'react'

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus()
    });

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        });

        setInput('');
    };

    return (
        <form className='todo-form' onSubmit={handleSubmit} >
            {props.edit ? ( 
                <>
                    <input 
                        type="text" 
                        placeholder='Дело измени тут!' 
                        value={input} 
                        name='text' 
                        className='todo-input edit'
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button className='todo-button edit' >Хорошо подумал?!</button>
                </>) : 
                (<>
                    <input 
                        type="text" 
                        placeholder='Ну и какие у тебя есть "важные" дела?' 
                        value={input} 
                        name='text' 
                        className='todo-input'
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button className='todo-button' >+1 дело</button>
                </>)
            }
        </form>
    );
}

export default TodoForm