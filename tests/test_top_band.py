def test_top_band_success(client):
    payload = {"prompt": "ಈಗಷ್ಟೇ ಬಂದ ಸುದ್ದಿ: ಸಚಿವರು ರಾಜೀನಾಮೆ ನೀಡಿದ್ದಾರೆ"}
    response = client.post("/top_band", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "bullets" in data
    assert "script" in data
    assert isinstance(data["bullets"], list)
    assert isinstance(data["script"], str)
