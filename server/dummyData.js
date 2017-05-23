//import Todo from './models/todo';
import Todo from './models/todo';


export default function () {
  Todo.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const content1 = `test`;
    const content2 = `test test`;


    //const post1 = new Post({ name: 'Admin', title: 'Hello MERN', slug: 'hello-mern', cuid: 'cikqgkv4q01ck7453ualdn3hd', content: content1 });
    //const post2 = new Post({ name: 'Admin', title: 'Lorem Ipsum', slug: 'lorem-ipsum', cuid: 'cikqgkv4q01ck7453ualdn3hf', content: content2 });

    const todo1 = new Todo({ cuid: 'cikqgkv4q01ck7453ualdn3hd', text: content1 });
    const todo2 = new Todo({ cuid: 'cikqgkv4q01ck7453ualdn3bd', text: content2 });

    Todo.create([todo1, todo2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
