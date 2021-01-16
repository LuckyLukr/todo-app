import React from 'react';
import {render, fireEvent, findByText, queryByText} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe("TODO app", () => {
    describe("when adding a new task", () => {
        it("should display the new task in the todo list", () => {
            const {getByText, getByPlaceholderText} = render(<App/>);

            fireEvent.change(getByPlaceholderText('Add new task...'), {target: {value: 'Foo'}});
            fireEvent.click(getByText('Add task'),  {button: 1});

            expect(getByText('Foo')).toBeInTheDocument();
        })
    })

    describe("when deleting an existing task", () => {
        it("should remove that task from the todo list", () => {
            const {getByText, getByPlaceholderText, queryByText} = render(<App />);

            fireEvent.change(getByPlaceholderText('Add new task...'), {target: {value: 'Foo'}});
            fireEvent.click(getByText('Add task'),  {button: 1});
            fireEvent.click(getByText('Delete'), {button: 1});
            fireEvent.click(getByText('Yes'), {button: 1});

            expect(queryByText('Foo')).not.toBeInTheDocument();
        })
    } )
});