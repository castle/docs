Secure Mode
===========

**We strongly encourage all Castle customers to enable Secure Mode to
prevent fraudsters from impersonating your users.** This is particularly
important when you're using the risk scores from Castle to lock user
accounts, where you need to make sure fraudsters can't lock out your
users by feeding in bad behavior.

To sign requests, you'll need to generate a signature on your backend,
then pass it to the Javascript snippet:

.. code-block:: javascript

    _castle('secure', 'YOUR_GENERATED_SIGNATURE');

The signature is a SHA-256 HMAC in hex format.

The HMAC shared secret is your *API Secret*, and the value is the *User
ID* being tracked in ``identify``.

Example
-------

.. code-block:: ruby

    <script type="text/javascript">
      _castle('secure',
        '<%%= OpenSSL::HMAC.hexdigest("sha256", "YOUR_API_SECRET", "1234") %>');
    </script>

.. code-block:: php

    <script type="text/javascript">
      _castle('secure',
        '<?= hash_hmac("sha256", "1234", "YOUR_API_SECRET"); ?>');
    </script>

Secure mode is activated as soon as we receive your first request
using a valid signature. Once enabled, you can disable it in the
dashboard.
