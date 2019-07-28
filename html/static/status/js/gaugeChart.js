class Gauge {
    constructor(placeholderName, configuration) {
        if ( placeholderName && configuration ) {
            this.config = null;
            this.body = null;
            this.placeholderName = placeholderName;
            this.configure(configuration);
        }
    }
    configure(configuration) {
        this.config = configuration;
		this.config.size               = this.config.size * 0.9;
		this.config.raduis             = this.config.size * 0.97 / 2;
		this.config.cx                 = this.config.size / 2;
		this.config.cy                 = this.config.size / 2;
		this.config.min                = configuration.min ? configuration.min : 0; 
        this.config.max                = configuration.max ? configuration.max : 100;
        
        this.config.range              = this.config.max - this.config.min;
        
		this.config.majorTicks         = configuration.majorTicks || 5;
		this.config.minorTicks         = configuration.minorTicks || 2;
		this.config.greenColor 	       = configuration.greenColor || '#109618';
		this.config.yellowColor        = configuration.yellowColor || '#FF9900';
		this.config.redColor           = configuration.redColor || '#DC3912';
		this.config.initValue          = configuration.initValue || 0;
        this.config.transitionDuration = configuration.transitionDuration || 500;
        
        this.render();
    }

    render() {
        let fontSize = Math.round(this.config.size / 16);
        let majorDelta = this.config.range / (this.config.majorTicks - 1);
        
        this.body = d3.select(`#${this.placeholderName}`)
                      .append('svg:svg')
                      .attr('class', 'gauge')
                      .attr('width', this.config.size)
                      .attr('height', this.config.size);

        this.body.append('svg:circle')
                 .attr('cx', this.config.cx)
                 .attr('cy', this.config.cy)
                 .attr('r', this.config.raduis)
                 .style('fill', '#ccc')
                 .style('stroke', '#000')
                 .style('stroke-width', '0.5px');
                         
        this.body.append('svg:circle')
                 .attr('cx', this.config.cx)
                 .attr('cy', this.config.cy)
                 .attr('r', 0.9 * this.config.raduis)
                 .style('fill', '#fff')
                 .style('stroke', '#e0e0e0')
                 .style('stroke-width', '2px');
        for (let i in this.config.greenZones) {
            this.drawBand(this.config.greenZones[i].from, this.config.greenZones[i].to, this.config.greenColor);
        }
        
        for (let i in this.config.yellowZones) {
            this.drawBand(this.config.yellowZones[i].from, this.config.yellowZones[i].to, this.config.yellowColor);
        }
        
        for (let i in this.config.redZones) {
            this.drawBand(this.config.redZones[i].from, this.config.redZones[i].to, this.config.redColor);
        }

        if (this.config.label) {
			let fontSize = Math.round(this.config.size / 9);
			this.body.append('svg:text')
					 .attr('x', this.config.cx)
					 .attr('y', this.config.cy / 2 + fontSize / 2)
					 .attr('dy', fontSize / 2)
					 .attr('text-anchor', 'middle')
					 .text(this.config.label)
					 .style('font-size', `${fontSize}px`)
					 .style('fill', '#333')
					 .style('stroke-width', '0px');
        }
        
        for (let major = this.config.min, cachePoint = null , outerFirstPoint = null, outerSecondPoint = null ; major <= this.config.max; major += majorDelta) {
            for (let innerFirstPoint = null, innerSecondPoint = null, minorDelta = majorDelta / this.config.minorTicks, minor = major + minorDelta, min = Math.min(major + majorDelta, this.config.max); minor < min; minor += minorDelta) {
				innerFirstPoint = this.valueToPoint(minor, 0.75);
				innerSecondPoint = this.valueToPoint(minor, 0.85);
				
				this.body.append('svg:line')
						 .attr('x1', innerFirstPoint.x)
						 .attr('y1', innerFirstPoint.y)
						 .attr('x2', innerSecondPoint.x)
						 .attr('y2', innerSecondPoint.y)
						 .style('stroke', '#666')
						 .style('stroke-width', '1px');
			}
			
			outerFirstPoint = this.valueToPoint(major, 0.7);
			outerSecondPoint = this.valueToPoint(major, 0.85);	
			
			this.body.append('svg:line')
					 .attr('x1', outerFirstPoint.x)
					 .attr('y1', outerFirstPoint.y)
					 .attr('x2', outerSecondPoint.x)
					 .attr('y2', outerSecondPoint.y)
					 .style('stroke', '#333')
					 .style('stroke-width', '2px');
			
			if (major === this.config.min || major === this.config.max) {
				cachePoint = this.valueToPoint(major, 0.63);
				
				this.body.append('svg:text')
				 		 .attr('x', cachePoint.x)
				 		 .attr('y', cachePoint.y)
				 		 .attr('dy', fontSize / 3)
				 		 .attr('text-anchor', major === this.config.min ? 'start' : 'end')
				 		 .text(major)
				 		 .style('font-size', fontSize + 'px')
						 .style('fill', '#333')
						 .style('stroke-width', '0px');
			}
		}
		
		let pointerContainer = this.body.append('svg:g').attr('class', 'pointerContainer');
		let midValue = (this.config.min + this.config.max) / 2;
		let pointerPath = this.buildPointerPath(midValue);
		let pointerLine = d3.svg.line()
								.x( d => d.x)
								.y( d => d.y )
								.interpolate('basis');
		
		pointerContainer.selectAll('path')
						.data([pointerPath])
						.enter()
						.append('svg:path')
						.attr('d', pointerLine)
						.style('fill', '#dc3912')
						.style('stroke', '#c63310')
						.style('fill-opacity', 0.7)
					
		pointerContainer.append('svg:circle')
						.attr('cx', this.config.cx)
						.attr('cy', this.config.cy)
						.attr('r', 0.12 * this.config.raduis)
						.style('fill', '#4684EE')
						.style('stroke', '#666')
						.style('opacity', 1);
		
		fontSize = Math.round(this.config.size / 10);
		pointerContainer.selectAll('text')
						.data([midValue])
						.enter()
						.append('svg:text')
						.attr('x', this.config.cx)
						.attr('y', this.config.size - this.config.cy / 4 - fontSize)
						.attr('dy', fontSize / 2)
						.attr('text-anchor', 'middle')
						.style('font-size', `${fontSize}px`)
						.style('fill', '#000')
						.style('stroke-width', '0px');
		this.redraw(this.config.initValue, 0);
        
    }

    buildPointerPath(value) {
        
        const valueToPoint = (value, factor) => {
			let point = this.valueToPoint(value, factor);
			point.x -= this.config.cx;
			point.y -= this.config.cy;
			return point;
		}
		let delta = this.config.range / 13;
		
		let head = valueToPoint(value, 0.85);
		let head1 = valueToPoint(value - delta, 0.12);
		let head2 = valueToPoint(value + delta, 0.12);
		
		let tailValue = value - (this.config.range * (1/(270/360)) / 2);
		let tail = valueToPoint(tailValue, 0.28);
		let tail1 = valueToPoint(tailValue - delta, 0.12);
		let tail2 = valueToPoint(tailValue + delta, 0.12);
		
		return [head, head1, tail2, tail, tail1, head2, head];
    }


    drawBand(start, end, color) {
        
        if (0 >= end - start) {
            return;
        }
		
		this.body.append('svg:path')
					.style('fill', color)
					.attr('d', d3.svg.arc()
                                     .startAngle(this.valueToRadians(start))
                                     .endAngle(this.valueToRadians(end))
                                     .innerRadius(0.65 * this.config.raduis)
                                     .outerRadius(0.85 * this.config.raduis)
                    )
                    .attr('transform', () => `translate(${this.config.cx},${this.config.cy}) rotate(270)`);
                    
    }


    redraw(value, transitionDuration) {
        let pointerContainer = this.body.select('.pointerContainer');
		pointerContainer.selectAll('text').text(`${value}%`);
		let pointer = pointerContainer.selectAll('path');
		pointer.transition()
               .duration(transitionDuration ? transitionDuration : this.config.transitionDuration)
               .attrTween('transform', () => {
						let pointerValue = value;
						if (value > this.config.max) {
                            pointerValue = this.config.max + 0.02 * this.config.range;
                        } else if (value < this.config.min) {
                            pointerValue = this.config.min - 0.02 * this.config.range;
                        }
                        
						let targetRotation = (this.valueToDegrees(pointerValue) - 90);
						let currentRotation = this._currentRotation || targetRotation;
						this._currentRotation = targetRotation;
						
						return (step) => {
							let rotation = currentRotation + (targetRotation - currentRotation) * step;
                            return `translate(${this.config.cx}, ${this.config.cy}) rotate(${rotation})`;
						}
					});
    }
    valueToDegrees (value) {
        return value / this.config.range * 270 - (this.config.min / this.config.range * 270 + 45);  
    }

    valueToRadians(value) {
        return this.valueToDegrees(value) * Math.PI / 180;
    }

    valueToPoint(value, factor) {
        return {
            x: this.config.cx - this.config.raduis * factor * Math.cos(this.valueToRadians(value)),
            y: this.config.cy - this.config.raduis * factor * Math.sin(this.valueToRadians(value))
        }
    }

}
