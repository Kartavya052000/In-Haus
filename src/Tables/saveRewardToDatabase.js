const saveRewardToDatabase = async (rewardName, redeemedDate, points) => {
    const response = await fetch('https://api.my-server.com/save-reward', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rewardName: rewardName,
        redeemedDate: redeemedDate,
        points: points,
      }),
    });
    const data = await response.json();
    console.log('Reward saved:', data);
  };
  