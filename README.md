
### DoggoFinder

Khrystyna Yadvinska

#### Description

Doggofinder is a website that allows users to find a dog from a database of shelter dogs. Once users login in with a name and email, they will be able to access the collection of available dogs with paginated results. The results are a list of the dogs that display their image, name, breed, age and zip code. The results can be filtered by age, zip code and breed. By default, the dogs are sorted in alphabetically ascending order by breed. However, the results may also be sorted in alphabetically descending order by breed, alphabetically by name and numerically by age. Users can add dogs to a favorites list and once they are done, they can press the match button to find a selected dog from that list. If the match is not desired, users are able to retry and/or reset their list of favorite dogs. 

https://doggofinder.vercel.app/

#### Technologies used

- Svelte
- Typescript 
- HTML
- CSS

#### How to use the website

1) Log in to access the collections of dogs
2) On the left hand side, there are options to filter or sort the results
3) Scroll down to the bottom of the page to find the navigation for the pages
4) To add a dog to the favorites list, press the "add to favorites" button
5) If a dog is in the favorites list an option to remove it will be presented on that same button.
6) To find a dog chosen from the favorites list, press the match button
7) If match is not desired press the retry button
8) To restart the favorites list, press the "reset favorites" button

#### How to run locally

```
git clone https://github.com/kewlyams/doggofinder.git
cd doggofinder
npm install
npm install axios
npm run dev -- --open
```



