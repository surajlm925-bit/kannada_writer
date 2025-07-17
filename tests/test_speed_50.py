def test_speed_50_success(client):
    payload = {"prompt": "ಕನ್ನಡದ ಪ್ರಮುಖ ಸುದ್ದಿ ಓರ್ವ ನಾಯಕನ ಬದಲಿ"}
    response = client.post("/speed_50", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "headlines" in data
    assert isinstance(data["headlines"], list)
