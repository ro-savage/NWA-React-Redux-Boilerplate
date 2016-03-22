import React from 'react'
import expect from 'expect'
import { shallow, mount, render } from 'enzyme'
import DropdownProfileCard from './DropdownProfileCard'
import styles from './DropdownProfileCard.scss'
import { Link } from 'react-router';


describe("[Component] DropdownProfileCard", function() {

  it("should render as a <Link> node", function() {
    const wrapper = shallow(<DropdownProfileCard picture="picture" name="name" nickname="nick" />);
    expect(wrapper.type()).toEqual(Link);
  })

  it("<Link> should contain correct styles", function() {
    const wrapper = shallow(<DropdownProfileCard picture="picture.jpg" name="name" nickname="nick" />);
    expect(wrapper.find(`.${styles.container}`).length).toEqual(1)
  })

  it("Should render 3 children", function() {
    const wrapper = shallow(<DropdownProfileCard picture="picture" name="name" nickname="nick" />);
    expect(wrapper.children().length).toEqual(3);
  })

  it('should render a render the nickname <span>', () => {
    const wrapper = shallow(<DropdownProfileCard picture="picture.jpg" name="name" nickname="nick" />);
    expect(wrapper.contains(<span className={styles.nickname}>nick</span>)).toEqual(true);
  })

  it("Should render username", function() {
    const wrapper = shallow(<DropdownProfileCard picture="picture.jpg" name="name" nickname="nick" />);
    expect(wrapper.find(`.${styles.username}`).length).toEqual(1)
  })

})
