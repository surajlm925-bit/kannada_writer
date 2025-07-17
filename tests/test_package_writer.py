def test_package_writer_success(client):
    payload = {"prompt": "ಬೆಂಗಳೂರು ನಗರದಲ್ಲಿ ಭಾರಿ ಮಳೆ"}
    response = client.post("/package_writer", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "package" in data
    assert isinstance(data["package"], str)
