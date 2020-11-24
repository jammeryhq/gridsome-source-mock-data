<div align="center">

<a href="https://www.jammeryhq.com" title="JammeryHQ" target="_blank">

  <img src="https://jammeryhq.com/jammeryhq.png" width="128" />
  
</a>

<p>
Fast-track your JAMstack development & learning
</p>
</div>

<hr />

# About this source plugin

Simple gridsome source plugin which uses 

https://github.com/danibram/mocker-data-generator

to generate your mock data.

It was never easier to generate fake data - YEAH!

# Supported features

* All features from the mocker-data-generator
* Unlimited gridsome collections
* One-to-One and One-to-Many relations

# Related data

There is no auto check to ensure that related content is generated when it's needed.
You have to make sure, that all data is generated in the correct order, otherwise
it's possible that relationship can't be created.

E.g. If the `Post` schema is generated before the `Tag` schema is generated,
you're not able to get the `id` information from the generated tags.

# Example

```js
//gridsome.config.js

// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  plugins: [
    {
      use: '@jammeryhq/source-mock-data',
      options: {
        collections: {
          post: 'Post',
          author: 'Author',
          category: 'Category',
          tag: 'Tag'
        },
        refs: {
          post: {
            author: 'Author',
            tags: '[Tag]',
            category: 'Category'
          }
        },
        amount: {
          post: 100,
          category: 10,
          tag: 20,
          author: 10
        },
        schema: {
          category: {
            id: {
              chance: 'guid'
            },
            title: {
              faker: 'lorem.words(5)'
            }
          },
          tag: {
            id: {
              chance: 'guid'
            },
            title: {
              faker: 'lorem.slug'
            }
          },
          author: {
            id: {
              chance: 'guid'
            },
            firstName: {
              faker: 'name.firstName'
            },
            lastName: {
              faker: 'name.lastName'
            },
            bio: {
              faker: 'lorem.sentences(2)'
            },
            email: {
              faker: 'internet.email'
            },
            avatar: {
              faker: 'internet.avatar'
            }
          },
          post: {
            id: {
              chance: 'guid'
            },
            title: {
              faker: 'lorem.words(5)'
            },
            slug: {
              function: function () {
                return this.faker.helpers.slugify(this.object.title)
              }
            },
            excerpt: {
              faker: 'lorem.sentences(2)'
            },
            createdAt: {
              faker: 'date.past(10)'
            },
            thumbnail: {
              faker: 'image.people'
            },
            content: {
              faker: 'lorem.paragraphs(10)'
            },
            author: {
              hasOne: 'author',
              get: 'id'
            },
            category: {
              hasOne: 'category',
              get: 'id'
            },
            tags: {
              hasMany: 'tag',
              max: 5,
              min: 1,
              get: 'id'
            }
          }
        }
      }
    }
  ]
}
```
