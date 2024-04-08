import { describe, it, expect } from "vitest";

import { mount, shallowMount } from "@vue/test-utils";
import HomeView from "./../../views/HomeView.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = shallowMount(HomeView);
    expect(wrapper.find("h1").text()).toContain("You did it!");
  });
});
