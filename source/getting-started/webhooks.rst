Webhooks
========

Webhooks allow you to receive notifications when the risk score for a
user exceeds the level you have configured in the dashboard.

A webhook notification can occur at any point when the user is logged in
and using your service, a mechanism often referred to as *continuous
authentication*.

Receiving a webhook notification
--------------------------------

Configuring your server to receive a new webhook is no different from
creating any page on your website. With PHP, you might create a new .php
file on your server; with a framework like Sinatra, you would add a new
route with the desired URL. Remember, with webhooks, your server is the
server receiving the request.

Alert data is sent as JSON in the request's body:

.. code-block:: json

    {
      "id": "TvLyYDqo8kdjU4uTxyffNCGqUU4Zs7Ay",
      "created_at": "2015-07-10T08:29:30.481Z",
      "risk": 0.39,
      "severity": "notice",
      "resolved_at": null,
      "flagged": null
      "user": {
        "id": "1234",
        ...
      },
      "context": {...}
    }

Parse the JSON and perform actions based on the risk or severity level:

.. code-block:: ruby

    require "json"

    # Using Sinatra
    post "/my/webhook/url" do
      # Retrieve the request's body and parse it as JSON
      json = JSON.parse(request.body.read)

      if json['severity'] == 'notice'
        # notify user by email
      end

      status 200
    end

.. code-block:: php

    // Retrieve the request's body and parse it as JSON
    $input = @file_get_contents("php://input");
    $json = json_decode($input);

    // Do something with $json

    http_response_code(200); // PHP 5.4 or greater

Head over to the `notification
settings <https://dashboard.castle.io/settings/notifications>`__ to test
out the alert webhooks.

Securing webhooks
-----------------

Since anyone could in principle send webhooks to your application, it’s
important to verify that these webhooks originated from Castle. Valid
webhooks will therefore contain the header ``X-Castle-Signature`` which
points to a HMAC SHA256 signature of the webhook payload (body):

.. code-block:: ruby

    require "json"

    # Using Sinatra
    require 'rubygems'
    require 'base64'
    require 'openssl'
    require 'sinatra'

    helpers do
      # Compare the computed HMAC digest based on the shared secret and the
      # request contents to the reported HMAC in the headers
      def verify_webhook(data, hmac_header)
        digest  = OpenSSL::Digest::Digest.new('sha256')
        calculated_hmac =
          Base64.encode64(OpenSSL::HMAC.digest(
            digest,
            'YOUR_API_SECRET',
            data)
          ).strip
        calculated_hmac == hmac_header
      end
    end

    # Respond to HTTP POST requests sent to this web service
    post '/' do
      request.body.rewind
      data = request.body.read
      verified = verify_webhook(data, env["HTTP_X_CASTLE_SIGNATURE"])

      # IMPLEMENT: handle the alert

      # Output 'true' or 'false'
      puts "Webhook verified: #{verified}"
    end

.. code-block:: php

    <?php
    function verify_webhook($data, $hmac_header)
    {
      $calculated_hmac = base64_encode(hash_hmac('sha256',
                                                 $data,
                                                 'YOUR_API_SECRET',
                                                 true));
      return ($hmac_header == $calculated_hmac);
    }

    $hmac_header = $_SERVER['HTTP_X_CASTLE_SIGNATURE'];
    $data = file_get_contents('php://input');
    $verified = verify_webhook($data, $hmac_header);
    error_log('Webhook verified: '.var_export($verified, true));
    ?>
