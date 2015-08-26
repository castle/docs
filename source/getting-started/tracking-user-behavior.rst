Tracking user behavior
======================

Castle identifies fraudsters through browsing and interaction behavior,
device characteristics, and location. This data lets Castle stop
fraudulent actors that have gained access to your users' credentials or
hijacked their login sessions.

Installation
------------

Step 1: Include the JavaScript snippet
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Installing Castle is easy, just paste the following snippet before the
closing ``<head>`` tag on all your pages. This will load the script onto
the page *asynchronously* so it won’t affect your page load speed. Don't
forget to call ``setAppId`` with your Castle App ID.

.. important:: The snippet must be included on **all your pages** even though the
   user isn't logged in.

.. code-block:: html

    <script type="text/javascript">
      (function(e,t,n,r){function i(e,n){e=t.createElement("script");e.async=1;e.src=r;n=t.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)}e[n]=e[n]||function(){(e[n].q=e[n].q||[]).push(arguments)};e.attachEvent?e.attachEvent("onload",i):e.addEventListener("load",i,false)})(window,document,"_castle","//d2t77mnxyo7adj.cloudfront.net/v1/c.js")
      _castle('setAppId', 'YOUR_CASTLE_APP_ID');
      _castle('trackPageview');
    </script>

.. note:: You must call ``trackPageview`` at least once per page load! If you
   have a **single-page app** you can call it multiple
   times, whenever a new page view occurs.

Step 2: Identify logged in users
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``identify`` call is how you tell Castle about the currently logged
in user. Use the same unique user ID you use internally, and use it
across the JavaScript snippet and REST API calls. Optionally add
additional properties for prettier display in the dashboard.

.. important:: Make sure to put this call before ``trackPageview``.

.. code-block:: html

    <script type="text/javascript">
      _castle('identify', '1234', {
        email: 'johan@castle.io',
        name: 'Johan B'
      });
    </script>


Reference
---------

Identify
~~~~~~~~

The ``identify`` method is how you tie one of your users and their
actions. You don't need to track any properties if your business model
requires that you keep the identity of your customers private.

The first argument is the user ID. We recommend using your database IDs
instead of simple email addresses or usernames, because database IDs
never change. That guarantees that even if the user changes their email
address, you can still recognize them as the same person in all of your
analytics tools.

.. code-block:: javascript

    // Minimal example
    _castle('identify', '1234')

    // Standard example
    _castle('identify', '1234', {
      created_at: '2012-12-02T00:30:08.276Z'
      email: 'johan@castle.io',
      name: 'Johan B'
    });

Properties
^^^^^^^^^^

-  ``email`` *String*: Must be a correctly formatted email address.
-  ``username`` *String*: If given, it will be displayed in the
   dashboard instead of the email address.
-  ``name`` *String*: If given, it will be displayed in the dashboard in
   conjunction with the email or username.
-  ``created_at`` *DateTime*: The date the user’s account was first
   created. We recommend
   `ISO-8601 <http://en.wikipedia.org/wiki/ISO_8601>`__ date strings,
   but also accept Unix timestamps for convenience.

.. important:: Make sure that you enable `secure mode <docs/secure_mode>`__ to
   prevent fraudsters to impersonate your users.

Pageviews
~~~~~~~~~

Pageviews are used to track what pages a visitor is browsing across your
site. A visitor can visit any number of pages during a browsing session.
Pageviews can currently only be tracked via the JavaScript tracker, and
not with any other libraries. You can choose to track the **full URL**
or the **path only**.

The page **URL** and **page title** can be modified, which is commonly
required when using a single-page web app. Other parameters (such as
user-agent, screen dimension etc.) are all detected internally when the
pageview is tracked.

Examples
^^^^^^^^

.. code-block:: javascript

    _castle('trackPageview');
    _castle('trackPageview', '/custom-path');
    _castle('trackPageview', '/custom-path', 'Custom title');
    _castle('trackPageview', 'http://customdomain.com/custom-path', 'Custom domain + path');
