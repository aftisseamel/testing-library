import React from 'react';
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import userEvent from'@testing-library/user-event'
import  { server }  from '../../tests/server.js';
import '@testing-library/jest-dom/extend-expect';
import App from '../app';

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('Scenario 1', async () => {
    render(<App />);
    
    //1
    expect(window.location.pathname).toBe("/");

    //2
    expect(screen.getByText(/Welcome home/i)).toBeInTheDocument();

    //3
    const linkElement = screen.getByRole('link', { name: /Fill out the form/i });
    expect(linkElement).toBeInTheDocument();

    //4
    userEvent.click(linkElement);

    //5
    expect(window.location.pathname).toBe('/page-1');

    //6
    expect(screen.getByText('Page 1')).toBeInTheDocument();

    //7
    const linkElement3 = screen.getByRole('link', { name: /Go home/i});
    expect(linkElement3).toBeInTheDocument();

    //8
    const favoriteFood = screen.getByLabelText(/Favorite food/i); 
    expect(favoriteFood).toBeInTheDocument();

    //9
    fireEvent.change(favoriteFood, { target: { value: '' } });
    expect(favoriteFood.value).toBe('');

    //10
    const Next = screen.getByText(/Next/i); 
    expect(Next).toBeInTheDocument();

    //11
    userEvent.click(Next);

    //12
    expect(window.location.pathname).toBe('/page-2');

    //13
    expect(screen.getByText(/Page 2/i)).toBeInTheDocument();

    // 14
    const Goback = screen.getByRole('link', { name: /Go back/i });
    expect(Goback).toBeInTheDocument();

    //15
    const favoriteDrink = screen.getByLabelText(/Favorite drink/i); 
    expect(favoriteDrink).toBeInTheDocument();

    //16
    fireEvent.change(favoriteDrink, { target: { value: 'Bière' } });
    expect(favoriteDrink.value).toBe('Bière');

    //17
    const Review = screen.getByRole('link', { name: /Review/i });
    expect(Review).toBeInTheDocument();

    //18
    userEvent.click(Review);

    //19
    expect(window.location.pathname).toBe('/confirm');

    //20
    const confirmElements = screen.queryAllByText('Confirm');
    expect(confirmElements.length).toBeGreaterThan(0);

    //21
    expect(screen.getByText(/Please confirm your choices/i)).toBeInTheDocument();

    //22
    const favoriteFoodLabel = screen.getByLabelText(/favorite food/i);
    expect(favoriteFoodLabel).toHaveTextContent("");

    //23
    const favoriteDrinkLabel = screen.getByLabelText(/favorite drink/i);
    expect(favoriteDrinkLabel).toHaveTextContent(/Bière/i);

    //24
    const Goback2 = screen.getByRole('link', { name: /Go back/i });
    expect(Goback2).toBeInTheDocument();

    //25
    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    expect(confirmButton).toBeInTheDocument();

    //26
    userEvent.click(confirmButton);

    //27
    await waitFor(() => expect(window.location.pathname).toBe("/error"));
    expect(window.location.pathname).toBe("/error");

    //28
    expect(screen.getByText(/Oh no. There was an error./i)).toBeInTheDocument();

    //29
    expect(screen.getByText(/les champs food et drink sont obligatoires/i)).toBeInTheDocument();

    //30
    const goHome = screen.getByRole('link', { name: /Go home/i });
    expect(goHome).toBeInTheDocument();

    //31
    const tryAgain = screen.getByRole('link', { name: /Try again/i });
    expect(tryAgain).toBeInTheDocument();

    //32
    userEvent.click(tryAgain)

    //33
    await waitFor(() => expect(window.location.pathname).toBe("/page-1"));
    expect(window.location.pathname).toBe("/page-1");

    //34
    expect(screen.getByText(/Page 1/i)).toBeInTheDocument();

  });