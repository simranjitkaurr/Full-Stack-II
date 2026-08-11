// --------------------------------------
// Experiment 3 - JWT Authentication
// --------------------------------------

// Demo users
const USERS = {
  admin: {
    password: "admin123",
    role: "admin",
    name: "Admin User"
  },

  editor: {
    password: "editor123",
    role: "editor",
    name: "Editor User"
  },

  viewer: {
    password: "viewer123",
    role: "viewer",
    name: "Viewer User"
  }
};

// Local Storage keys
const TOKEN_KEY = "experiment3_access_token";
const REFRESH_KEY = "experiment3_refresh_token";
const USER_KEY = "experiment3_user";


// --------------------------------------
// Encode data
// --------------------------------------
function encode(data) {
  return btoa(
    encodeURIComponent(data).replace(
      /%([0-9A-F]{2})/g,
      function (match, p1) {
        return String.fromCharCode("0x" + p1);
      }
    )
  );
}


// --------------------------------------
// Decode data
// --------------------------------------
function decode(data) {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(data), function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}


// --------------------------------------
// Create a demo JWT token
// --------------------------------------
function createToken(payload, expiresIn = 60) {

  const header = encode(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT"
    })
  );

  const body = encode(
    JSON.stringify({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + expiresIn
    })
  );

  // Demo signature
  const signature = encode("experiment3-demo-signature");

  return `${header}.${body}.${signature}`;
}


// --------------------------------------
// Login
// --------------------------------------
export function login(username, password) {

  // Remove accidental spaces
  username = username.trim().toLowerCase();
  password = password.trim();

  const user = USERS[username];

  // Check username and password
  if (!user) {
    return {
      success: false,
      message: "Invalid username or password"
    };
  }

  if (user.password !== password) {
    return {
      success: false,
      message: "Invalid username or password"
    };
  }


  // Create access token
  const accessToken = createToken(
    {
      userId: username,
      role: user.role,
      name: user.name
    },
    60
  );


  // Create refresh token
  const refreshToken = createToken(
    {
      userId: username,
      role: user.role,
      type: "refresh"
    },
    300
  );


  // Save tokens
  localStorage.setItem(
    TOKEN_KEY,
    accessToken
  );

  localStorage.setItem(
    REFRESH_KEY,
    refreshToken
  );


  // Save user information
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({
      username: username,
      name: user.name,
      role: user.role
    })
  );


  return {
    success: true,
    user: {
      username: username,
      name: user.name,
      role: user.role
    }
  };
}


// --------------------------------------
// Logout
// --------------------------------------
export function logout() {

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}


// --------------------------------------
// Get access token
// --------------------------------------
export function getToken() {

  return localStorage.getItem(TOKEN_KEY);
}


// --------------------------------------
// Get refresh token
// --------------------------------------
export function getRefreshToken() {

  return localStorage.getItem(REFRESH_KEY);
}


// --------------------------------------
// Get logged-in user
// --------------------------------------
export function getUser() {

  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}


// --------------------------------------
// Decode JWT
// --------------------------------------
export function decodeToken(token) {

  try {

    if (!token) {
      return null;
    }

    const parts = token.split(".");

    if (parts.length !== 3) {
      return null;
    }

    return JSON.parse(
      decode(parts[1])
    );

  } catch {

    return null;
  }
}


// --------------------------------------
// Check token expiry
// --------------------------------------
export function isTokenExpired(
  token = getToken()
) {

  const payload = decodeToken(token);

  if (!payload || !payload.exp) {
    return true;
  }

  return Date.now() >= payload.exp * 1000;
}


// --------------------------------------
// Refresh access token
// --------------------------------------
export function refreshAccessToken() {

  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    logout();
    return null;
  }

  if (isTokenExpired(refreshToken)) {
    logout();
    return null;
  }

  const payload = decodeToken(refreshToken);

  if (!payload) {
    logout();
    return null;
  }

  const user = getUser();

  const newAccessToken = createToken(
    {
      userId: payload.userId,
      role: payload.role,
      name: user?.name || payload.userId
    },
    60
  );

  localStorage.setItem(
    TOKEN_KEY,
    newAccessToken
  );

  return newAccessToken;
}