"use server";

const base64tokens = btoa(`${process.env.NEXT_PUBLIC_TRADEDOUBLER_CLIENT_ID}:${process.env.NEXT_PUBLIC_TRADEDOUBLER_CLIENT_SECRET}`);

const getOAuthToken = async ({ refreshToken }) => {
    try {
        
        const response = await fetch(`https://connect.tradedoubler.com/uaa/oauth/token`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
                Authorization: `Basic ${base64tokens}`
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`---> An error occured`, error);
        return new Response(
            JSON.stringify({ text: `[TradeDoubler][Get OAuth Token]Bad request ${error}` }),
            { status: 400 }
        );
    }
}

const loginWithCredentials = async () => {
    try {
        const username = process.env.NEXT_PUBLIC_TRADEDOUBLER_USERNAME;
        const password = process.env.NEXT_PUBLIC_TRADEDOUBLER_PASSWORD;
        const response = await fetch(`https://connect.tradedoubler.com/uaa/oauth/token`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
                Authorization: `Basic ${base64tokens}`
            },
            body: new URLSearchParams({grant_type: 'password', username, password})
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`---> An error occured`, error);
        return new Response(
            JSON.stringify({ text: `[TradeDoubler][Login With Credentials]Bad request ${error}` }),
            { status: 400 }
        );
    }
}

const getTradeDoublerDashboard = async ({ accessToken, intervalType }) => {
    
    const url = `https://connect.tradedoubler.com/advertiser/report/dashboard?intervalType=TODAY&reportCurrencyCode=EUR`;
    const options = {
        method: 'GET',
        headers: {Accept: 'application/json', Authorization: `Bearer ${accessToken}`}
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(`---> An error occured`, error);
        return new Response(
            JSON.stringify({ text: `[TradeDoubler][Get TradeDoubler Dashboard]Bad request ${error}` }),
            { status: 400 }
        );
    }
}

const getTradeDoublerEvents = async ({ accessToken }) => {

    const url = 'https://connect.tradedoubler.com/advertiser/events';
    const options = {
      method: 'GET',
      headers: {Accept: 'application/json', Authorization: 'Bearer ' + accessToken}
    };
    
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(`---> An error occured`, error);
      return new Response(
        JSON.stringify({ text: `[TradeDoubler][Get TradeDoubler Events]Bad request ${error}` }),
        { status: 400 }
    );
    }
}

const getTradeDoublerPrograms = async ({ accessToken }) => {
    
    const url = 'https://connect.tradedoubler.com/advertiser/programs';
    const options = {
        method: 'GET',
        headers: {Accept: 'application/json', Authorization: 'Bearer ' + accessToken}
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(`---> An error occured`, error);
        return new Response(
            JSON.stringify({ text: `[TradeDoubler][Get TradeDoubler Programs]Bad request ${error}` }),
            { status: 400 }
        );
    }
}

export { getOAuthToken, loginWithCredentials, getTradeDoublerDashboard, getTradeDoublerEvents, getTradeDoublerPrograms };