---
id: 1
title: 'Two Forms of Pre-rendering'
date: '2020-01-01'
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.

```javascript
console.log("This is a test")
```

```ruby
# frozen_string_literal: true

require "action_pack"
require "active_support"
require "active_support/rails"
require "active_support/i18n"

module AbstractController
  extend ActiveSupport::Autoload

  autoload :ActionNotFound, "abstract_controller/base"
  autoload :Base
  autoload :Caching
  autoload :Callbacks
  autoload :Collector
  autoload :DoubleRenderError, "abstract_controller/rendering"
  autoload :Helpers
  autoload :Logger
  autoload :Rendering
  autoload :Translation
  autoload :AssetPaths
  autoload :UrlFor

  def self.eager_load!
    super
    AbstractController::Caching.eager_load!
    AbstractController::Base.descendants.each do |controller|
      unless controller.abstract?
        controller.eager_load!
      end
    end
  end
end
```
