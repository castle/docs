Request context
===============

Each tracked event and generated verification contain a ``context``
field with the ``ip``, ``location`` and ``user_agent``.

.. code-block:: json

    {
      "ip": "64.71.28.158",
      "location": {
        "country_code": "US",
        "country": "United States",
        "region": "California",
        "region_code": "CA",
        "city": "San Francisco",
        "lat": 37.7957,
        "lon": -122.4209
      },
      "user_agent": {
        "raw": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36",
        "browser": "Chrome",
        "version": "43.0.2357",
        "os": "Mac OS X 10.10.3",
        "mobile": false,
        "platform": "Mac OS X"
      }
    }
