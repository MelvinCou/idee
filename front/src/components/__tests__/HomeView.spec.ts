import { describe, it, expect } from "vitest";

import { shallowMount } from "@vue/test-utils";
import LandingPage from "./../../views/LandingPage.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = shallowMount(LandingPage);
    expect(wrapper.find("h1").text()).toContain(
      "Lancez-vous dans un voyage et planifiez votre itinéraire",
    );
  });
});
