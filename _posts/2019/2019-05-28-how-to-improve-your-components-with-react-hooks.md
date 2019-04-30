---
layout: post
title: How to improve your components with React Hooks
date: 2019-05-28
header_image: public/metal-hooks.jpg
header_position: center
category: coding
tags: ["javascript", "reactjs"]
authors: ["Jonathan"]
about_authors: ["jwieben"]
---

The React world has been going crazy over the new [Hooks API](https://reactjs.org/docs/hooks-overview.html){:target="_blank"} that was released a few months ago. New libraries for hooks are appearing left and right, and everyone seems to be rewriting their apps with them.

So what is it about hooks that people are so excited about? Well, there are a variety of reasons. In this post I would like to focus on one of the central advantages that hooks bring to the table: **they allow you to organize your component logic in a simpler way.**

I am going to illustrate this by writing the same component in two ways, with and without hooks, and later compare them.

## A typical class component

Let's assume we wanted to write a `UserProfile` component, that displays a user's profile picture next to their name. We also want the profile picture to be hidden when the window width is less than 1024 pixels. (You'd probably use CSS for that, but we are going to do it the JS-way for demonstrational purposes.)

In order to achieve this, we are going to need some state. It should store the user data as well as a flag indicating if we are on a small screen. We will use the component's lifecycle methods to set and update these values.

Here's how such a component might look:

```js
class UserProfile extends React.Component {
  state = {
    isMobile: window.innerWidth <= 1024,
    user: null
  };

  componentDidMount() {
    this.fetchUser();
    window.addEventListener("resize", this.handleResize);
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.fetchUser();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    if (this.state.isMobile && window.innerWidth > 1024) {
      this.setState({ isMobile: false });
    } else if (!this.state.isMobile && window.innerWidth <= 1024) {
      this.setState({ isMobile: true });
    }
  };

  fetchUser = () => {
    fetch(`https://some-api.com/user/${this.props.userId}`)
      .then(response => response.json())
      .then(user => this.setState({ user }));
  };

  render() {
    if (!this.state.user) return null;
    return (
      <div>
        {!this.state.isMobile && <img src={this.state.user.image} />}
        <p>{this.state.user.name}</p>
      </div>
    );
  }
}
```

Great, our component does what it is supposed to.

## Hooking up our component

Now let's see what the same component would look like if we use hooks.

```js
function UserProfile({ userId }) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 1024);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (isMobile && window.innerWidth > 1024) {
        setIsMobile(false);
      } else if (!isMobile && window.innerWidth <= 1024) {
        setIsMobile(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    fetch("https://some-api.com/user/" + userId)
      .then(response => response.json())
      .then(user => setUser(user));
  }, [userId]);

  if (!user) return null;
  return (
    <div>
      {!isMobile && <img src={user.image} />}
      <p>{user.name}</p>
    </div>
  );
}
```

We can immediately notice that our component got shorter, which is usually a good thing. But I would also argue that our component got easier to read and understand. Of course, this is always going to be subjective. But for the sake of the argument, let me hypothesize why one might get this feeling of reduced complexity.

I think the reason that this function version of our component is easier to understand lies in **the way the component logic is organized**. To demonstrate this point, I put both versions side by side and added some color coding. (Yellow: Code related to user data, Red: Code related to screen size)

![Component comparison](/assets/img/pages/blog/images/react-hooks-component-comparison.png)

We can see that in the function component, each logic is much more grouped together than in the class component. This not only makes our component easier to read top to bottom, but also easier to extract logic from.

## Going further

Now that we have rewritten our component as a function, let's think about how we can improve it even further.

Let's say we wanted to reuse some of our component logic in another place. We could decide to just copy and paste the logic we want to reuse, but React now provides us with a better way: custom hooks. Custom hooks allow you to extract your component logic into reusable functions. Here's how they would look for our `UserProfile` component:

```js
function useUser(userId) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetch("https://some-api.com/user/" + userId)
      .then(response => response.json())
      .then(user => setUser(user));
  }, [userId]);

  return user;
}

function useResponsive() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 1024);

  React.useEffect(() => {
    const handleResize = () => {
      if (isMobile && window.innerWidth > 1024) {
        setIsMobile(false);
      } else if (!isMobile && window.innerWidth <= 1024) {
        setIsMobile(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
```

Now that we have extracted the different pieces of component logic, we can reuse them in our `UserProfile` component.

```js
function UserProfile({ userId }) {
  const user = useUser(userId);
  const isMobile = useResponsive();

  if (!user) return null;
  return (
    <div>
      {!isMobile && <img src={user.image} />}
      <p>{user.name}</p>
    </div>
  );
}
```

On top of improving the readability of our `UserProfile` even further, we can now reuse our logic in any component we want. 🎉

Even though we haven't been rewriting all our apps with hooks here at ePages, we have already found great value in using them for our refactors, and new components. We are hooked, are you?
