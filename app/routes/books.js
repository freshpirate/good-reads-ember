import Route from '@ember/routing/route';

export default Route.extend({
    model(){
        let books = this.get('store').findAll('book');

        // books.then(function(books){
        //     console.log(books.length);
        // });
        return books;
    }
});
