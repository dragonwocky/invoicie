"use client";

export const useClientValue = <T = string>(
  clientKey: string,
  defaultValue: T,
): T => {
  try {
    const clientValue = localStorage.getItem(clientKey);
    return JSON.parse(clientValue || "") as T ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setClientValue = <T = string>(clientKey: string, value: T) => {
  localStorage.setItem(clientKey, JSON.stringify(value));
};
