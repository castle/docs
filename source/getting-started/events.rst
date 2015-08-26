Tracking security events
========================

The more security-related actions you track from your backend, the more
accurate Castle is in identifying fraudsters. It also gives you greater
insight in the Castle dashboard.

You should at least try to track ``$login.succeeded``,
``$login.failed``, and ``$logout.succeeded`` as these are all valuable
signals when it comes to detecting account hijacks and brute-force
attacks.

For more technical documentation please check out our PHP library
<https://github.com/castle/castle-php> or Ruby gem on
GitHub <https://github.com/castle/castle-ruby>.

Tracking
--------

Event names and detail properties that have semantic meaning are
prefixed ``$``, and we handle them in special ways.

Step 1: Track successful logins
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you have access to a **logged in user**, set ``user_id`` to the
same user identifier as when you initiated Castle.js.

.. code-block:: ruby

    castle.track(
      name: '$login.succeeded',
      user_id: user.id
    )

.. code-block :: php

    <?php

    Castle::track(array(
      'name' => '$login.succeeded',
      'user_id' => $user->id
    ));

    ?>

.. code-block:: java

    // TBD

.. code-block:: bash

    curl https://api.castle.io/v1/events \
      -X POST \
      -u :gBQokikJOvH4olfBiI2HlWQ2 \
      -H "Content-Type: application/json" \
      -H "X-Castle-Cookie-Id: a97b492d-dcc3-4fc1-87d6-65682955afa5" \
      -H "X-Castle-Ip: 37.46.187.90" \
      -H "X-Castle-Headers: {\"User-Agent\": \"Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko\", \"Accept\": \"text/html\", \"Accept-Language\": \"en-us,en;q=0.5\"}" \
      \
      -d '{"name": "$login.succeeded", "user_id": "1234"}'

Track ``$logout.succeeded`` in the same way.

.. raw:: html

   <!-- Check out the [REST docs](https://api.castle.io/docs#request-context) on how to configure the headers. -->

Step 2: Track failed logins
~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you don't have access to a logged in user, just omit ``user_id``.
Instead, whenever you have access to the user-submitted form value, add
this to the event details as ``$login``.

.. code-block:: ruby

    castle.track(
      name: '$login.failed',
      details: {
        '$login' => 'johan@castle.io'
      }
    )

.. code-block:: php


    <?php

    Castle::track(array(
      'name' => '$login.failed',
      'details' => array(
        '$login' => 'johan@castle.io'
      )
    ));

    ?>

.. code-block:: java

    // TBD

.. code-block:: bash

    curl https://api.castle.io/v1/events \
      -X POST \
      -u :gBQokikJOvH4olfBiI2HlWQ2 \
      -H "Content-Type: application/json" \
      -H "X-Castle-Cookie-Id: a97b492d-dcc3-4fc1-87d6-65682955afa5" \
      -H "X-Castle-Ip: 37.46.187.90" \
      -H "X-Castle-Headers: {\"User-Agent\": \"Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko\", \"Accept\": \"text/html\", \"Accept-Language\": \"en-us,en;q=0.5\"}" \
      \
      -d '{"name": "$login.failed", "details": {"$login": "johan@castle.io"}}'

Supported events
----------------

-  ``$login.succeeded``: Record when a user attempts to log in.
-  ``$login.failed``: Record when a user logs out.
-  ``$logout.succeeded``: Record when a user logs out.
-  ``$registration.succeeded``: Capture account creation, both when a
   user signs up as well as when created manually by an administrator.
-  ``$registration.failed``: Record when an account failed to be
   created.
-  ``$password_reset.requested``: An attempt was made to reset a user’s
   password.
-  ``$password_reset.succeeded``: The user completed all of the steps in
   the password reset process and the password was successfully reset.
   Password resets **do not** required knowledge of the current
   password.
-  ``$password_reset.failed``: Use to record when a user failed to reset
   their password.
-  ``$password_change.succeeded``: Use to record when a user changed
   their password. This event is only logged when users change their
   **own** password.
-  ``$password_change.failed``: Use to record when a user failed to
   change their password.
-  ``$challenge.requested``: Record when a user is prompted with
   additional verification, such as two-factor authentication or a
   captcha.
-  ``$challenge.succeeded``: Record when additional verification was
   successful.
-  ``$challenge.failed``: Record when additional verification failed.

Supported detail properties
~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  ``$login``: The submitted email or username from when the user
   attempted to log in or reset their password. Useful when there is no
   ``user_id`` available.
