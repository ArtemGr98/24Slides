import { memo, useReducer } from 'react';
import { CenteredLayout } from '~/components';
import { useRenderHighlight } from '~/utils';
import css from './optimize-1.module.scss';

interface TodosDataI {
    id: number;
    text: string;
    done: boolean;
}

const todosData: TodosDataI[] = [
    { id: 1, text: 'run a marathon', done: false },
    { id: 2, text: 'ride an elephant', done: false },
    { id: 3, text: 'swim with a fish', done: false },
];

// TODO Fix all list re-rendering when only one component is changed :(

interface TodoProps {
    text: string;
    done: boolean;
    onClick: () => void;
}

const areEqual = (prevProps: TodoProps, nextProps: TodoProps) => {
    return prevProps.done === nextProps.done;
}

const Todo = memo(({ text, done, onClick }: TodoProps) => {
    const ref = useRenderHighlight(css.render);

    return (
        <li ref={ref} onClick={onClick} className={css.listItem}>
            {done ? '[x]' : '[ ]'} {text}
        </li>
    );
}, areEqual);

export const Optimize1 = () => {
    const handleTodoClick = (state: TodosDataI[], id: number): TodosDataI[] => {
        return state.map((todo) => todo.id === id ? { ...todo, done: !todo.done } : todo);
    }

    const [todos, dispatch] = useReducer(handleTodoClick, todosData);

    return (
        <CenteredLayout className='gap-4'>
            <div className='text-3xl'>It re-renders all items! =\</div>
            <div>We need to fix that</div>
            <ul>
                {todos.map((item) => (
                    <Todo
                        key={item.id}
                        text={item.text}
                        done={item.done}
                        onClick={() => dispatch(item.id)}
                    />
                ))}
            </ul>
        </CenteredLayout>
    );
};
