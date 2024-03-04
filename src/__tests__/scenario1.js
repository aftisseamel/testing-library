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
    expect(screen.getByText('Welcome home')).toBeInTheDocument();

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
    fireEvent.change(favoriteFood, { target: { value: 'Les pâtes' } });
    expect(favoriteFood.value).toBe('Les pâtes');
    
    //10
    const nextLink = screen.getByText(/Next/i);
    expect(nextLink).toBeInTheDocument();

    //11
    userEvent.click(nextLink);

    //12
    expect(window.location.pathname).toBe('/page-2');

    //13
    expect(screen.getByText(/Page 2/i)).toBeInTheDocument();

    //14
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
    expect(favoriteFoodLabel).toHaveTextContent(/Les pâtes/i);

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
    await waitFor(() => expect(window.location.pathname).toBe("/success"));
    expect(window.location.pathname).toBe("/success");

    //28
    expect(screen.getByText(/Congrats. You did it./i)).toBeInTheDocument();

    //29
    const GoHomeSuccss = screen.getByRole('link', { name: /Go home/i });
    expect(GoHomeSuccss).toBeInTheDocument();

    //30
    userEvent.click(GoHomeSuccss);

    //31
    expect(window.location.pathname).toBe("/");

    //32
    expect(screen.getByText(/Welcome home/i)).toBeInTheDocument();
  });